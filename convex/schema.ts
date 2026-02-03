import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        email: v.string(),
        name: v.optional(v.string()),
        clerkId: v.string(),
        subscriptionTier: v.union(
            v.literal("free"),
            v.literal("pro"),
            v.literal("creator_plus")
        ),
        razorpaySubscriptionId: v.optional(v.string()),
        razorpayCustomerId: v.optional(v.string()),
        subscriptionEndsAt: v.optional(v.number()),
        createdAt: v.number(),
    }).index("by_clerk_id", ["clerkId"]),

    links: defineTable({
        userId: v.id("users"),
        name: v.string(),
        slug: v.string(),
        destinationUrl: v.string(),
        platform: v.optional(v.string()), // e.g. "instagram", "youtube"
        isActive: v.boolean(),
        clicks: v.number(),
        createdAt: v.number(),
    })
        .index("by_user_id", ["userId"])
        .index("by_slug", ["slug"]),

    clicks: defineTable({
        linkId: v.id("links"),
        platform: v.string(), // Detected platform: "instagram", "youtube", etc.
        referrer: v.optional(v.string()),
        country: v.optional(v.string()),
        city: v.optional(v.string()),
        device: v.optional(v.string()), // "mobile", "desktop"
        userAgent: v.optional(v.string()),
        timestamp: v.number(),
    }).index("by_link_id", ["linkId"]),
});
