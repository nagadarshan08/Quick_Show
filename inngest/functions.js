import { inngest } from "./client.js";
import connectDB from "../config/db.js";
import User from "../models/User.js";

// ✅ CREATE USER (Clerk → DB)
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await User.create({
      clerkId: id,
      firstName: first_name,
      lastName: last_name,
      email: email_addresses[0]?.email_address,
      imageUrl: image_url,
    });

    return { success: true };
  }
);

// ✅ UPDATE USER
export const updateUser = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    await connectDB();

    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await User.findOneAndUpdate(
      { clerkId: id },
      {
        firstName: first_name,
        lastName: last_name,
        email: email_addresses[0]?.email_address,
        imageUrl: image_url,
      }
    );

    return { success: true };
  }
);

// ✅ DELETE USER
export const deleteUser = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.findOneAndDelete({ clerkId: id });

    return { success: true };
  }
);