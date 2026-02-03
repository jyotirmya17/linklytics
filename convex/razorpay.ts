import { v } from "convex/values";
import { action, internalMutation, mutation } from "./_generated/server";

export const createSubscription = action({
    args: {
        planId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }

        const key_id = process.env.RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        if (!key_id || !key_secret) {
            throw new Error("Razorpay credentials missing");
        }

        try {
            // Create subscription via Fetch API
            const response = await fetch("https://api.razorpay.com/v1/subscriptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + btoa(key_id + ":" + key_secret)
                },
                body: JSON.stringify({
                    plan_id: args.planId,
                    customer_notify: 1,
                    total_count: 120,
                    quantity: 1
                })
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Razorpay API Error:", error);
                throw new Error("Razorpay API failed");
            }

            const subscription = await response.json();

            return {
                subscriptionId: subscription.id,
                keyId: key_id,
            };
        } catch (error) {
            console.error("Razorpay Error:", error);
            throw new Error("Failed to create subscription");
        }
    },
});

export const verifyPayment = mutation({
    args: {
        razorpay_payment_id: v.string(),
        razorpay_subscription_id: v.string(),
        razorpay_signature: v.string(),
        planType: v.union(v.literal("pro"), v.literal("creator_plus")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const secret = process.env.RAZORPAY_KEY_SECRET || "";

        // Verify signature using Web Crypto API
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);
        const messageData = encoder.encode(args.razorpay_payment_id + "|" + args.razorpay_subscription_id);

        const key = await crypto.subtle.importKey(
            "raw",
            keyData,
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"]
        );

        const signatureBuffer = await crypto.subtle.sign(
            "HMAC",
            key,
            messageData
        );

        const generated_signature = Array.from(new Uint8Array(signatureBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        if (generated_signature !== args.razorpay_signature) {
            throw new Error("Invalid Payment Signature");
        }

        // Update User
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (user) {
            await ctx.db.patch(user._id, {
                subscriptionTier: args.planType,
                razorpaySubscriptionId: args.razorpay_subscription_id,
                subscriptionEndsAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
            });
        }
    },
});

export const internalUpdateSubscription = internalMutation({
    args: {
        subscriptionId: v.string(),
        endsAt: v.number(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter(q => q.eq(q.field("razorpaySubscriptionId"), args.subscriptionId))
            .unique();

        if (user) {
            await ctx.db.patch(user._id, {
                subscriptionEndsAt: args.endsAt * 1000,
            });
            console.log(`Updated subscription for user ${user._id}`);
        } else {
            console.warn(`No user found for subscription ${args.subscriptionId}`);
        }
    },
});
