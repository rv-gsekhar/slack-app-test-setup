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
      output_field1: {
        type: Schema.types.string,
        description: "Field1 in uppercase",
      },

      output_field2: {
        type: Schema.slack.types.timestamp,
        description: "timestamp field",
      },
    },
    required: ["output_field1", "output_field2"],
  },
});

export default SlackFunction(SlackAppTestFunction, ({ inputs }) => {
  const { field1, field2, field3, field4 } = inputs;

  const output_field1 = field1 + field2 + field4;
  const output_field2 = field3;

  return { outputs: { output_field1, output_field2 } };
});
