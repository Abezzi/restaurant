import { createClient } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import type { GenericCtx } from "@convex-dev/better-auth/utils";
import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { components } from "../_generated/api";
import type { DataModel } from "../_generated/dataModel";
import authConfig from "../auth.config";
import schema from "./schema";

// Better Auth Component
export const authComponent = createClient<DataModel, typeof schema>(
  components.betterAuth,
  {
    local: { schema },
    verbose: false,
  },
);

// Better Auth Options
export const createAuthOptions = (ctx: GenericCtx<DataModel>) => {
  const isDev = process.env.NODE_ENV !== "production";

  return {
    appName: "restaurant",
    baseURL:
      process.env.VITE_CONVEX_SITE_URL ||
      "https://exciting-toad-792.convex.site",
    trustedOrigins: ["http://localhost:3000"],
    secret: process.env.BETTER_AUTH_SECRET,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [convex({ authConfig })],
    // extra roles to the default betterAuth config, the schema is generated from this file
    user: {
      additionalFields: {
        role: {
          type: "string",
          required: false,
          input: false,
        },
      },
    },
    advanced: {
      useSecureCookies: !isDev,
      // Default attributes for all cookies
      defaultCookieAttributes: {
        secure: !isDev, // false in dev, allows localhost:3000
        sameSite: isDev ? "lax" : "none", // lax in dev (safer), none in prod if cross-site
      },
      cookies: {
        jwt: {
          attributes: {
            sameSite: isDev ? "lax" : "none",
            secure: !isDev,
            path: "/",
            // domain: isDev ? undefined : ".yourdomain.com",  // for prod cross-subdomain
          },
        },
        session_token: {
          attributes: {
            sameSite: isDev ? "lax" : "none",
            secure: !isDev,
          },
        },
      },
    },
  } satisfies BetterAuthOptions;
};

// For `auth` CLI
export const options = createAuthOptions({} as GenericCtx<DataModel>);

// Better Auth Instance
export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth(createAuthOptions(ctx));
};
