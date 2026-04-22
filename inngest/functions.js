import { inngest } from "./client.js";

export const functions = [
  inngest.createFunction(
    { id: "test-function" },
    { event: "test/event" },
    async ({ event }) => {
      console.log("Event:", event);
    }
  ),
];