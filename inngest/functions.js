import { inngest } from "./client.js";

const functions = [
  inngest.createFunction(
    { id: "test-function" },
    { event: "test/event" },
    async ({ event }) => {
      console.log("Event received:", event);
    }
  ),
];

export default functions;