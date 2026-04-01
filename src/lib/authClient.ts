import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { authComponent } from "../../convex/betterAuth/auth";
// import type { auth } from "./auth";
// import auth from "../../convex/auth.config";

export const authClient = createAuthClient({
  plugins: [convexClient(), inferAdditionalFields<typeof authComponent>()],
  baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
});
