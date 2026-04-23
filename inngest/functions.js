import { inngest } from "./client.js";

export const testFunction = inngest.createFunction(
  { id: "test-function" },
  { event: "test/event" },
  async () => {
    console.log("TEST WORKING");
    return { ok: true };
  }
);

export const functions = [testFunction];