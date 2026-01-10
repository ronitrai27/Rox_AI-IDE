import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        name: v.string(),

    },
    handler: async (ctx, args) => {
        // CHECKING IDENTITIY WITH CLERK
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        // If user is not Authenticated he cannot create a project
        await ctx.db.insert("projects", {
            name: args.name,
            ownerId: identity.subject
        })
    }
});

export const get = query({
    args: {},
    handler: async (ctx) => {
        // CHECKING IDENTITIY WITH CLERK
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return [];
        }

        return await ctx.db
            .query("projects")
            .withIndex("by_owner", q => q.eq("ownerId", identity.subject)) // Filtering projects by ownerId only
            .collect();
    }
})