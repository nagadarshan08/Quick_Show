import { serve } from "inngest/express";
import { inngest } from "../inngest/client.js";
import functions from "../inngest/functions.js";

const handler = serve({
  client: inngest,
  functions,
});

export default handler;