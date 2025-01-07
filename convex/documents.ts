import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const get = query({
    args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
    handler: async (ctx, args) => {

        const user = await ctx.auth.getUserIdentity();
        if (!user) throw new ConvexError("Unauthorized");

        const organizationId = (user.organization_id ?? undefined) as | string | undefined;

        // Search within Organization
        if (args.search && organizationId) return await ctx.db
            .query("documents")
            .withSearchIndex("search_title", (q) => q.search("title", args.search!).eq("organizationId", organizationId)).paginate(args.paginationOpts);

        // Personal Search
        if (args.search) return await ctx.db
            .query("documents")
            .withSearchIndex("search_title", (q) => q.search("title", args.search!).eq("ownerId", user.subject))
            .paginate(args.paginationOpts);

        // All Docs Inside Organization
        if (organizationId) return await ctx.db
            .query("documents")
            .withIndex("by_organization_id", (q) => q.eq("organizationId", organizationId))
            .paginate(args.paginationOpts);

        // All Personal DocsF
        return await ctx.db
            .query("documents")
            .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
            .paginate(args.paginationOpts);
    },
});

export const create = mutation({
    args: {
        title: v.optional(v.string()),
        initialContent: v.optional(v.string())
    },
    handler: async (ctx, args) => {

        const user = await ctx.auth.getUserIdentity();
        if (!user) throw new ConvexError("Unauthorized");

        const organizationId = (user.organization_id ?? undefined) as
            | string
            | undefined;

        const documentId = await ctx.db.insert("documents", {
            title: args.title ?? "Untitled Document",
            ownerId: user.subject,
            organizationId,
            initialContent: args.initialContent
        });

        return documentId;
    }
});

export const removeById = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {

        const user = await ctx.auth.getUserIdentity();
        if (!user) throw new ConvexError("Unauthorized");

        const document = await ctx.db.get(args.id);
        if (!document) throw new ConvexError("Document Not Found");

        const isOwner = document.ownerId === user.subject;
        if (!isOwner) throw new ConvexError("Unauthorized");

        return await ctx.db.delete(args.id);
    }
});

export const updateById = mutation({
    args: { id: v.id("documents"), title: v.string() },
    handler: async (ctx, args) => {

        const user = await ctx.auth.getUserIdentity();
        if (!user) throw new ConvexError("Unauthorized");

        const document = await ctx.db.get(args.id);
        if (!document) throw new ConvexError("Document Not Found");

        const isOwner = document.ownerId === user.subject;
        if (!isOwner) throw new ConvexError("Unauthorized");

        return await ctx.db.patch(args.id, { title: args.title });
    }
});