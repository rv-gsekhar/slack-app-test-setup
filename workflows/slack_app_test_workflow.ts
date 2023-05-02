import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { SlackAppTestFunction } from "../functions/slack_app_test_function.ts";

const SlackAppTestWorkflow = DefineWorkflow({
  callback_id: "slack_app_test_workflow",
  title: "Slack App Test Workflow",
  description: "This is a test workflow for the Slack App",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: ["interactivity"],
  },
});

const userInputForm = SlackAppTestWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Form title goes here",
    interactivity: SlackAppTestWorkflow.inputs.interactivity,
    submit_label: "Submit",
    description: "What is the purpose of this form?",
    fields: {
      elements: [
        {
          name: "field1",
          title: "Field1",
          type: Schema.types.string,
          description: "simple text input field",
        },
        {
          name: "field2",
          title: "Field2",
          description: "long text input field",
          type: Schema.types.string,
          long: true,
        },
        {
          name: "field3",
          title: "Field3",
          type: Schema.slack.types.timestamp,
          description: "Timestamp field",
        },
        {
          name: "field4",
          title: "Field4",
          description: "Dropdown field",
          type: Schema.types.string,
          enum: [
            "Option 1",
            "Option 2",
            "Option 3",
          ],
        },
      ],
      required: [
        "field1",
        "field2",
        "field3",
        "field4",
      ],
    },
  },
);

const processedDataOutput = SlackAppTestWorkflow.addStep(SlackAppTestFunction, {
  field1: userInputForm.outputs.fields.field1,
  field2: userInputForm.outputs.fields.field2,
  field3: userInputForm.outputs.fields.field3,
  field4: userInputForm.outputs.fields.field4,
});

SlackAppTestWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: "C055RLG0PV1",
  message:
    `Your data was processed with status code: ${processedDataOutput.outputs.status_code} status text: ${processedDataOutput.outputs.status_text}!`,
});

export { SlackAppTestWorkflow };
