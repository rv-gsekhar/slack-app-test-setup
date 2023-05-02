import { Manifest } from "deno-slack-sdk/mod.ts";

import { SlackAppTestFunction } from "./functions/slack_app_test_function.ts";
import { SlackAppTestWorkflow } from "./workflows/slack_app_test_workflow.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "slack-app-test-setup",
  description: "Test for setting up a slack app",
  icon: "assets/default_new_app_icon.png",
  functions: [SlackAppTestFunction],
  workflows: [SlackAppTestWorkflow],
  outgoingDomains: ["jsonplaceholder.typicode.com"],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
