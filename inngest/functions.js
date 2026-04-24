const syncUser = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      await connectDB();
      console.log("Connected to DB");

      console.log("Event data:", event.data);

      const user = await User.create({
        clerkId: event.data.id,
        email: event.data.email_addresses?.[0]?.email_address,
        firstName: event.data.first_name,
        lastName: event.data.last_name,
      });

      console.log("User saved:", user);
    } catch (err) {
      console.error("ERROR:", err);

      throw err; // 🔥 THIS LINE FIXES EVERYTHING
    }
  }
);