import { Infer, v, Validator } from "convex/values";

export const Role = v.union(
  v.literal("admin"),
  v.literal("owner"),
  v.literal("waitress"),
  v.literal("chef"),
  v.literal("kitchen"),
) as Validator<"admin" | "owner" | "waitress" | "chef" | "kitchen">;

export type RoleType = Infer<typeof Role>;

export const defaultPermissions: Record<RoleType, string[]> = {
  admin: ["*"],
  owner: [
    "view_ready_dishes",
    "edit_dishes",
    "change_prices",
    "update_landing_page",
    "manage_users",
  ],
  waitress: ["view_ready_dishes"],
  chef: ["view_ready_dishes", "edit_dishes", "mark_as_ready"],
  kitchen: ["view_ready_dishes", "mark_as_ready"],
};
