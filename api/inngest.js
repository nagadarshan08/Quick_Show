import { serve } from "inngest/express";
import { inngest } from "../inngest/client.js";
import { functions } from "../inngest/functions.js";

console.log("INNGEST FILE LOADED"); // 🔥 DEBUG

const handler = serve({
  client: inngest,
  functions,
});

export const GET = handler;
export const POST = handler;