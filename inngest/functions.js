import { inngest } from "./client.js";
import User from "../models/User.js";

// ✅ CREATE USER (Clerk → DB)
const createUser = inngest.createFunction(
  { id: "create-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await User.create({
      clerkId: id,
      name: `${first_name || ""} ${last_name || ""}`,
      email: email_addresses?.[0]?.email_address,
      image: image_url,
    });

    console.log("User created:", id);
  }
);

// ✅ UPDATE USER
const updateUser = inngest.createFunction(
  { id: "update-user" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, image_url } = event.data;

    await User.findOneAndUpdate(
      { clerkId: id },
      {
        name: `${first_name || ""} ${last_name || ""}`,
        image: image_url,
      }
    );

    console.log("User updated:", id);
  }
);

// ✅ DELETE USER
const deleteUser = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await User.findOneAndDelete({ clerkId: id });

    console.log("User deleted:", id);
  }
);

// ✅ EXPORT ALL FUNCTIONS
export const functions = [createUser, updateUser, deleteUser];