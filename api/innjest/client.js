import { Inngest } from "inngest";
import User from "../models/user.js";
import connectDB from "../configs/db.js";

export const inngest = new Inngest({
  id: "movie-ticket-booking",
});

export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    event: "clerk/user.created",
  },
  async ({ event }) => {
    try {
      console.log("EVENT RECEIVED:", event);

      await connectDB();
      console.log("DB CONNECTED");

      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      await User.create({
        _id: id,
        email: email_addresses?.[0]?.email_address,
        name: first_name + " " + last_name,
        image: image_url,
      });

      console.log("USER CREATED");
    } catch (err) {
      console.error("ERROR:", err);
      throw err;
    }
  }
);

export const functions = [syncUserCreation];