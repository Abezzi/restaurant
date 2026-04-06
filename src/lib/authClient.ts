import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
// import { InferAdditionalFieldsFromPluginOptions }
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "convex/betterAuth/auth";

export const authClient = createAuthClient({
  plugins: [convexClient(), inferAdditionalFields<typeof auth>()],
  baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
});
