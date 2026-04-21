import { inngest } from "./client.js";
import User from "../models/User.js";

// Inngest function
export const userCreated = inngest.createFunction(
  { id: "user-created" },
  { event: "user/created" },
  async ({ event }) => {
    const { name, email } = event.data;

    await User.create({ name, email });

    return { success: true };
  }
);