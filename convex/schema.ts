import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { Role } from "./types";

export default defineSchema({
  products: defineTable({
    title: v.string(),
    imageId: v.string(),
    price: v.number(),
  }),
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
  }),
  restaurant: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    address: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    openingHours: v.object({
      monday: v.string(),
      tuesday: v.string(),
      wednesday: v.string(),
      thursday: v.string(),
      friday: v.string(),
      saturday: v.string(),
      sunday: v.string(),
    }),
    isOpen: v.boolean(),
    logoUrl: v.optional(v.string()),
    bannerUrl: v.optional(v.string()),
  }).index("by_name", ["name"]),
  roles: defineTable({
    name: Role,
    description: v.optional(v.string()),
    permissions: v.array(v.string()), // e.g. ["view_ready_dishes", "edit_dishes", "change_prices", "access_api_config"]
  })
    .index("by_name", ["name"])
    .index("by_permission", ["permissions"]),
});
