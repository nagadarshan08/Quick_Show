import { serve } from "inngest/next.js";
import { Inngest } from "inngest";
import connectDB from "./configs/db.js";
import User from "./models/user.js";

// create client
const inngest = new Inngest({ id: "movie-ticket-booking" });

// function
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    event: "clerk/user.created",
  },
  async ({ event }) => {
    await connectDB(); // ✅ connect DB

    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await User.create({
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    });
  }
);

// export handler
export default serve({
  client: inngest,
  functions: [syncUserCreation],
});

