import { serve } from "inngest/vercel";  // ✅ FIXED
import { inngest } from "../inngest/client.js";
import functions from "../inngest/functions.js";

export default serve({
  client: inngest,
  functions,
});