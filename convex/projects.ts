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
    });
    return projectId;
  },
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
      .withIndex("by_owner", (q) => q.eq("ownerId", identity?.subject!)) // Filtering projects by ownerId only
      .take(args.limit || 5);
  },
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
      .withIndex("by_owner", (q) => q.eq("ownerId", identity?.subject!)) // Filtering projects by ownerId only
      .collect();
  },
});

// =======================
// GET Full PROJECTS
// =======================
export const getById = query({
  args: {
    id: v.id("projects"),
  },
  handler: async (ctx, args) => {
    // CHECKING IDENTITIY WITH CLERK
    const identity = await verifyAuth(ctx);

    const project = await ctx.db.get("projects", args.id);

    if (!project) {
      throw new Error("Project not found");
    }
    // If user is not authorized to access this project
    if (project.ownerId !== identity?.subject) {
      throw new Error("You are not authorized to access this project");
    }

    return project;
  },
});

// =======================
// GET Full PROJECTS
// =======================
export const rename = mutation({
  args: {
    id: v.id("projects"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // CHECKING IDENTITIY WITH CLERK
    const identity = await verifyAuth(ctx);

    const project = await ctx.db.get("projects", args.id);

    if (!project) {
      throw new Error("Project not found");
    }
    // If user is not authorized to access this project
    if (project.ownerId !== identity?.subject) {
      throw new Error("You are not authorized to access this project");
    }

    await ctx.db.patch("projects", args.id, {
      name: args.name,
      updatedAt: Date.now(),
    });
  },
});
