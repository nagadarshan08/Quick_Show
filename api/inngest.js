import { serve } from "inngest/express";
import { inngest } from "../inngest/client.js";
import { functions } from "../inngest/functions.js";

export const config = {
  runtime: "nodejs",
};

export default serve({
  client: inngest,
  functions,
});