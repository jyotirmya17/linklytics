import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getStats = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user) {
            return {
                totalClicks: 0,
                totalVisitors: 0,
                activeLinks: 0,
                topReferrers: [],
                clickHistory: [],
                platformDistribution: []
            };
        }

        const links = await ctx.db
            .query("links")
            .withIndex("by_user_id", (q) => q.eq("userId", user._id))
            .collect();

        const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
        const activeLinks = links.length;

        // Fetch clicks for distribution and history
        const relevantLinks = links
            .sort((a, b) => b.clicks - a.clicks)
            .slice(0, 15);

        const clicksPromises = relevantLinks.map(link =>
            ctx.db.query("clicks")
                .withIndex("by_link_id", q => q.eq("linkId", link._id))
                .order("desc")
                .take(200)
        );

        const clicksResults = await Promise.all(clicksPromises);
        const allClicks = clicksResults.flat();

        // 1. Calculate Unique Visitors (Mock estimation based on userAgent for this demo)
        const visitorsSet = new Set(allClicks.map(c => c.userAgent || "unknown"));
        const totalVisitors = Math.max(visitorsSet.size, Math.floor(totalClicks * 0.7));

        // 2. Click History (Last 7 days)
        const historyMap = new Map<string, number>();
        const days = 7;
        const now = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const d = new Date();
            d.setDate(now.getDate() - i);
            const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            historyMap.set(dateStr, 0);
        }

        allClicks.forEach(click => {
            const d = new Date(click.timestamp);
            const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            if (historyMap.has(dateStr)) {
                historyMap.set(dateStr, (historyMap.get(dateStr) || 0) + 1);
            }
        });

        const clickHistory = Array.from(historyMap.entries()).map(([name, value]) => ({
            name,
            value
        }));

        // 3. Process Top Referrers & Distribution
        const referrerMap = new Map<string, number>();
        allClicks.forEach(click => {
            const source = click.platform || click.referrer || "Direct";
            referrerMap.set(source, (referrerMap.get(source) || 0) + 1);
        });

        const platformColors: Record<string, string> = {
            "youtube": "bg-red-500",
            "twitter": "bg-black",
            "x": "bg-black",
            "instagram": "bg-pink-500",
            "tiktok": "bg-[#00f2ea]",
            "facebook": "bg-blue-600",
            "google": "bg-green-500",
            "linkedin": "bg-blue-700",
            "whatsapp": "bg-emerald-500",
            "direct": "bg-slate-500"
        };

        const sortedReferrers = Array.from(referrerMap.entries())
            .map(([name, visits]) => {
                const n = name.toLowerCase();
                const colorKey = Object.keys(platformColors).find(k => n.includes(k)) || "direct";
                return {
                    name,
                    visits,
                    color: platformColors[colorKey],
                    percentage: totalClicks > 0 ? Math.round((visits / totalClicks) * 100) : 0
                };
            })
            .sort((a, b) => b.visits - a.visits);

        const topReferrers = sortedReferrers.slice(0, 6);

        // Specific Platform Distribution for the right card
        const platformDistribution = sortedReferrers.slice(0, 4).map((r, i) => ({
            name: r.name,
            value: r.percentage,
            color: ["bg-red-500", "bg-blue-500", "bg-pink-500", "bg-orange-500"][i] || "bg-slate-500"
        }));

        // 4. Fetch Recent Activity
        const recentClicksRaw = allClicks.slice(0, 10);
        const recentClicks = await Promise.all(recentClicksRaw.map(async (click) => {
            const link = links.find(l => l._id === click.linkId);
            return {
                linkName: link?.name || link?.slug || "Unknown",
                platform: click.platform,
                timestamp: click.timestamp,
                location: click.city && click.country ? `${click.city}, ${click.country}` : (click.country || "Global")
            };
        }));

        const platformNotes: Record<string, string> = {
            "YouTube": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
            "Instagram": "Bring you closer to the people and things you love. Express yourself and connect with friends through photos and stories.",
            "X": "X is the future state of unlimited interactivity – centered in audio, video, messaging, payments/banking – creating a global marketplace.",
            "TikTok": "TikTok is the leading destination for short-form mobile video. Our mission is to inspire creativity and bring joy.",
            "WhatsApp": "Simple. Secure. Reliable messaging and calling, available all over the world. Connection with your close ones.",
            "Facebook": "Connect with friends, family and other people you know. Share photos and videos, send messages and get updates.",
            "LinkedIn": "Manage your professional identity. Build and engage with your professional network. Access knowledge, insights and opportunities.",
            "Direct": "Direct traffic includes visitors who type your URL into their browser link bar or click on a bookmark. It's the cleanest form of traffic."
        };

        return {
            totalClicks,
            totalVisitors,
            activeLinks,
            topReferrers,
            clickHistory,
            platformDistribution,
            recentClicks,
            platformNotes
        };
    },
});


export const getAll = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return [];
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user) {
            return [];
        }

        const links = await ctx.db
            .query("links")
            .withIndex("by_user_id", (q) => q.eq("userId", user._id))
            .order("desc")
            .collect();

        return links;
    },
});

export const create = mutation({
    args: {
        destinationUrl: v.string(),
        slug: v.string(),
        name: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        const links = await ctx.db
            .query("links")
            .withIndex("by_user_id", (q) => q.eq("userId", user._id))
            .collect();

        const limits = {
            free: 2,
            pro: 10,
            creator_plus: 30,
        };

        const limit = limits[user.subscriptionTier as keyof typeof limits] ?? 0;

        if (links.length >= limit) {
            throw new Error(`You have reached the limit of ${limit} links for the ${user.subscriptionTier} plan. Please upgrade to create more.`);
        }

        // Check if slug is taken
        const existing = await ctx.db
            .query("links")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();

        if (existing) {
            throw new Error("Slug already taken");
        }

        const linkId = await ctx.db.insert("links", {
            userId: user._id,
            name: args.name || "Untitled Link",
            slug: args.slug.trim(),
            destinationUrl: args.destinationUrl,
            isActive: true,
            clicks: 0,
            createdAt: Date.now(),
        });

        return linkId;
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const link = await ctx.db
            .query("links")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();
        return link;
    },
});

export const logClick = mutation({
    args: {
        linkId: v.id("links"),
        platform: v.string(),
        referrer: v.optional(v.string()),
        userAgent: v.optional(v.string()),
        country: v.optional(v.string()),
        city: v.optional(v.string()),
        device: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // 1. Log the click event
        await ctx.db.insert("clicks", {
            linkId: args.linkId,
            platform: args.platform,
            referrer: args.referrer,
            userAgent: args.userAgent,
            country: args.country,
            city: args.city,
            device: args.device,
            timestamp: Date.now(),
        });

        // 2. Increment the link's total click count
        const link = await ctx.db.get(args.linkId);
        if (link) {
            await ctx.db.patch(args.linkId, {
                clicks: link.clicks + 1
            });
        }
    },
});
