// triggers/slack_app_test_trigger.ts
import { Trigger } from "deno-slack-api/types.ts";

const trigger: Trigger = {
  type: "shortcut",
  name: "Trigger Slack App Test Workflow",
  description: "Test trigger for slack app",
  workflow: "#/workflows/slack_app_test_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
  },
};

export default trigger;
