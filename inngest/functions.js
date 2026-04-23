import { inngest } from "./client.js";
import User from "../models/User.js";

// ✅ CREATE USER (when user signs up in Clerk)
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await User.create({
      clerkId: id,
      name: `${first_name || ""} ${last_name || ""}`,
      email: email_addresses[0]?.email_address,
      image: image_url,
    });

    return { success: true };
  }
);

// ✅ UPDATE USER
export const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await User.findOneAndUpdate(
      { clerkId: id },
      {
        name: `${first_name || ""} ${last_name || ""}`,
        email: email_addresses[0]?.email_address,
        image: image_url,
      }
    );

    return { success: true };
  }
);

// ✅ DELETE USER
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await User.findOneAndDelete({ clerkId: id });

    return { success: true };
  }
);

// ✅ EXPORT ALL
export const functions = [
  syncUserCreation,
  syncUserUpdate,
  syncUserDeletion,
];