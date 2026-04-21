import { inngest } from "./client.js";

export const userCreated = inngest.createFunction(
  { id: "user-created" },
  { event: "user/created" },
  async ({ event }) => {
    console.log("User Created Event:", event.data);
  }
);