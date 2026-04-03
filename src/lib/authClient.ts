import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [convexClient()],
  baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
});
