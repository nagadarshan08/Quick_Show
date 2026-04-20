import { serve } from "inngest/vercel";
import { inngest, functions } from "./inngest/client.js";

export default serve({
  client: inngest,
  functions,
});