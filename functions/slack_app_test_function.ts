import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

export const SlackAppTestFunction = DefineFunction({
  callback_id: "slack_app_test_function",
  title: "Slack app test function",
  description: "This function processes user input form form",
  source_file: "functions/slack_app_test_function.ts",
  input_parameters: {
    properties: {
      field1: {
        type: Schema.types.string,
        description: "simple text input field",
      },
      field2: {
        type: Schema.types.string,
        description: "long text input field",
      },

      field3: {
        type: Schema.slack.types.timestamp,
        description: "timestamp field",
      },
      field4: {
        type: Schema.types.string,
        description: "Dropdown field",
      },
    },
    required: ["field1", "field2", "field3", "field4"],
  },
  output_parameters: {
    properties: {
      status_code: {
        type: Schema.types.number,
        description: "status code",
      },

      status_text: {
        type: Schema.types.string,
        description: "status text",
      },
    },
    required: ["status_code", "status_text"],
  },
});

interface sampleData {
  name: string;
  descr: string;
  timestamp: number;
  option: string;
}

const postData = async (data: sampleData) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  let status_code;
  let status_text;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    status_code = response.status;
    status_text = response.statusText;

    if (!response.ok) {
      const error = await response.text();
      return { status_code, status_text, error };
    }

    return { status_code, status_text, error: null };
  } catch (error) {
    console.error(error);

    return {
      status_code: 500,
      status_text: "Internal Server Error",
      error: error.message,
    };
  }
};

export default SlackFunction(SlackAppTestFunction, ({ inputs }) => {
  const { field1, field2, field3, field4 } = inputs;

  const data = {
    name: field1,
    descr: field2,
    timestamp: field3,
    option: field4,
  };

  const { status_code, status_text, error } = postData(data);

  return { outputs: { status_code, status_text } };
});
