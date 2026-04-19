import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    event: "clerk/user.created",
  },
  async ({ event }) => {
    console.log("User created:", event.data);
  }
);

// ✅ ADD THIS
export const functions = [syncUserCreation];