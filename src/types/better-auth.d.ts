import type { InferSession } from "better-auth";

declare module "better-auth" {
  interface User {
    role?: "admin" | "owner" | "waitress" | "chef" | "kitchen";
  }

  interface Session extends InferSession {
    user: User;
  }
}
