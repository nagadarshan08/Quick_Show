import { Inngest } from "inngest";
import User from "../models/User.js";
import connectDB from "../configs/db.js";

// Create Inngest client
export const inngest = new Inngest({
  id: "movie-ticket-booking",
  eventKey: process.env.INNGEST_EVENT_KEY,
});

// 🔹 1. Sync User Creation
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    try {
      await connectDB();

      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url,
      };

      await User.findByIdAndUpdate(id, userData, {
        upsert: true,
        new: true,
      });

      console.log("✅ User Created/Updated:", id);
    } catch (error) {
      console.error("❌ Error creating user:", error);
    }
  }
);

// 🔹 2. Sync User Deletion
const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    try {
      await connectDB();

      const { id } = event.data;
      await User.findByIdAndDelete(id);

      console.log("🗑️ User Deleted:", id);
    } catch (error) {
      console.error("❌ Error deleting user:", error);
    }
  }
);

// 🔹 3. Sync User Update
const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: [{ event: "clerk/user.updated" }],
  },
  async ({ event }) => {
    try {
      await connectDB();

      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      const userData = {
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        image: image_url,
      };

      await User.findByIdAndUpdate(id, userData, { new: true });

      console.log("🔄 User Updated:", id);
    } catch (error) {
      console.error("❌ Error updating user:", error);
    }
  }
);

// Export all functions
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
];