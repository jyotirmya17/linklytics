import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
    path: "/razorpay-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const body = await request.text();
        const signature = request.headers.get("x-razorpay-signature");
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        if (!signature || !secret) {
            return new Response("Missing signature or secret", { status: 400 });
        }

        // Verify Signature using Web Crypto API
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);
        const messageData = encoder.encode(body);

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

        if (generated_signature !== signature) {
            return new Response("Invalid signature", { status: 403 });
        }

        const event = JSON.parse(body);

        // Handle Subscription Events
        // We care about subscription.charged (payment success)
        if (event.event === "subscription.charged") {
            const subscription = event.payload.subscription.entity;
            const endsAt = subscription.current_end; // Timestamp in seconds
            const subId = subscription.id;

            await ctx.runMutation(internal.razorpay.internalUpdateSubscription, {
                subscriptionId: subId,
                endsAt: endsAt,
            });
        }

        return new Response("OK", { status: 200 });
    }),
});

export default http;
