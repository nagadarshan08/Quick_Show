import { serve } from "inngest/next";
import { inngest } from "../inngest/client.js";
import { functions } from "../inngest/functions.js";

// Create the handler
export default serve({
  client: inngest,
  functions,
});