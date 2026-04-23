import { serve } from "inngest/express";
import { inngest } from "../inngest/client.js";
import {
  syncUserCreation,
  updateUser,
  deleteUser,
} from "../inngest/functions.js";

export default serve({
  client: inngest,
  functions: [
    syncUserCreation,
    updateUser,
    deleteUser,
  ],
});