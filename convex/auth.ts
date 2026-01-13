import { mutation, query, QueryCtx, MutationCtx } from "./_generated/server";

// A common Function to verify Authentication
export const verifyAuth = async (ctx: QueryCtx | MutationCtx) => {
    const identity = ctx.auth.getUserIdentity();

    if (!identity) {
        throw new Error("Unauthorized");
    }
    
    return identity;
}