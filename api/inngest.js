import { serve } from "inngest/express";
import { inngest } from "../inngest/client.js";
import { functions } from "../inngest/functions.js";

// Vercel serverless handler
const handler = serve({
  client: inngest,
  functions,
});

// Export for all HTTP methods (IMPORTANT for Vercel)
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;