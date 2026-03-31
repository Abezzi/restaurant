import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const restaurant = await ctx.db.query("restaurant").first();

    if (!restaurant) {
      return {
        name: "Sandia Restaurant",
        description: "Bienvenidos a nuestro restaurante",
        address: "Talca, Región del Maule",
        phone: "+56 9 1234 5678",
        email: "contacto@restaurante.cl",
        openingHours: {
          monday: "12:00 - 23:00",
          tuesday: "12:00 - 23:00",
          wednesday: "12:00 - 23:00",
          thursday: "12:00 - 23:00",
          friday: "12:00 - 00:00",
          saturday: "12:00 - 00:00",
          sunday: "Cerrado",
        },
        isOpen: true,
        logoUrl: undefined,
        bannerUrl: undefined,
      };
    }

    return restaurant;
  },
});

export const update = mutation({
  args: {
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    address: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    openingHours: v.optional(
      v.object({
        monday: v.string(),
        tuesday: v.string(),
        wednesday: v.string(),
        thursday: v.string(),
        friday: v.string(),
        saturday: v.string(),
        sunday: v.string(),
      }),
    ),
    isOpen: v.optional(v.boolean()),
    logoUrl: v.optional(v.string()),
    bannerUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("restaurant").first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return { success: true, updated: true };
    } else {
      // First time — create the document
      await ctx.db.insert("restaurant", {
        name: args.name ?? "Talca Restaurante",
        description: args.description,
        address: args.address,
        phone: args.phone,
        email: args.email,
        openingHours: args.openingHours ?? {
          monday: "12:00 - 22:00",
          tuesday: "12:00 - 22:00",
          wednesday: "12:00 - 22:00",
          thursday: "12:00 - 22:00",
          friday: "12:00 - 22:00",
          saturday: "12:00 - 20:00",
          sunday: "Closed",
        },
        isOpen: args.isOpen ?? true,
        logoUrl: args.logoUrl,
        bannerUrl: args.bannerUrl,
      });
      return { success: true, created: true };
    }
  },
});
