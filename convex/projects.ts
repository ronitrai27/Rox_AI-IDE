import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { verifyAuth } from "./auth";


// =======================
// CREATE PROJECT
// =======================
export const create = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        // CHECKING IDENTITIY WITH CLERK
        const identity = await verifyAuth(ctx);

        // If user is not Authenticated he cannot create a project
        const projectId = await ctx.db.insert("projects", {
            name: args.name,
            ownerId: identity?.subject!,
            updatedAt: Date.now(),

        })
        return projectId;
    }
});

// =======================
// GET Partial PROJECTS
// =======================
export const getPartial = query({
    args: {
        limit: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        // CHECKING IDENTITIY WITH CLERK
        const identity = await verifyAuth(ctx);

        return await ctx.db
            .query("projects")
            .withIndex("by_owner", q => q.eq("ownerId", identity?.subject!)) // Filtering projects by ownerId only
            .take(args.limit || 5)
    }
});

// =======================
// GET Full PROJECTS
// =======================
export const get = query({
    args: {},
    handler: async (ctx) => {
        // CHECKING IDENTITIY WITH CLERK
        const identity = await verifyAuth(ctx);

        return await ctx.db
            .query("projects")
            .withIndex("by_owner", q => q.eq("ownerId", identity?.subject!)) // Filtering projects by ownerId only
            .collect();
    }
});
