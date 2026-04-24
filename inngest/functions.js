import { inngest } from "./client.js";
import User from "../models/User.js";
import connectDB from "../config/db.js";

const syncUser = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name } = event.data;

    await User.create({
      clerkId: id,
      email: email_addresses[0].email_address,
      firstName: first_name,
      lastName: last_name,
    });
  }
);

const updateUser = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    await connectDB();
    const { id, first_name, last_name } = event.data;

    await User.findOneAndUpdate(
      { clerkId: id },
      { firstName: first_name, lastName: last_name }
    );
  }
);

const deleteUser = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;

    await User.findOneAndDelete({ clerkId: id });
  }
);

export const functions = [syncUser, updateUser, deleteUser];