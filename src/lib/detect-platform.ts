/**
 * Platform Detection for Link Click Tracking
 * 
 * Priority order:
 * 1. UTM Source parameter (most reliable, user-controlled)
 * 2. User-Agent  (detects in-app browsers from mobile apps)
 * 3. Referrer URL (works for desktop browser clicks)
 * 4. Default → "Direct"
 */

const UTM_TO_PLATFORM: Record<string, string> = {
    "instagram": "Instagram",
    "ig": "Instagram",
    "youtube": "YouTube",
    "yt": "YouTube",
    "twitter": "X",
    "x": "X",
    "tiktok": "TikTok",
    "facebook": "Facebook",
    "fb": "Facebook",
    "linkedin": "LinkedIn",
    "whatsapp": "WhatsApp",
    "wa": "WhatsApp",
    "telegram": "Telegram",
    "tg": "Telegram",
    "snapchat": "Snapchat",
    "snap": "Snapchat",
    "reddit": "Reddit",
    "pinterest": "Pinterest",
    "threads": "Threads",
    "email": "Email",
    "newsletter": "Email",
};

/**
 * User-Agent patterns for in-app browsers.
 * Mobile apps embed their own WebView and often include identifiable strings.
 * Order matters — more specific patterns should come first.
 */
const UA_PATTERNS: Array<{ pattern: string; platform: string }> = [
    // Instagram
    { pattern: "instagram", platform: "Instagram" },
    // Facebook / Messenger
    { pattern: "fbav", platform: "Facebook" },
    { pattern: "fban", platform: "Facebook" },
    { pattern: "fb_iab", platform: "Facebook" },
    { pattern: "messenger", platform: "Facebook" },
    // WhatsApp
    { pattern: "whatsapp", platform: "WhatsApp" },
    { pattern: "wa/", platform: "WhatsApp" },
    // TikTok
    { pattern: "tiktok", platform: "TikTok" },
    { pattern: "musical_ly", platform: "TikTok" },
    { pattern: "bytedance", platform: "TikTok" },
    { pattern: "bytelocale", platform: "TikTok" },
    // YouTube
    { pattern: "com.google.android.youtube", platform: "YouTube" },
    { pattern: "ytios", platform: "YouTube" },
    { pattern: "youtube", platform: "YouTube" },
    // X / Twitter
    { pattern: "twitter", platform: "X" },
    { pattern: "twitterandroid", platform: "X" },
    // LinkedIn
    { pattern: "linkedin", platform: "LinkedIn" },
    { pattern: "lclclient", platform: "LinkedIn" },
    // Snapchat
    { pattern: "snapchat", platform: "Snapchat" },
    // Telegram
    { pattern: "telegram", platform: "Telegram" },
    { pattern: "tgweb", platform: "Telegram" },
    // Threads (Meta)
    { pattern: "barcelona", platform: "Threads" },
    // Reddit
    { pattern: "reddit", platform: "Reddit" },
    // Pinterest
    { pattern: "pinterest", platform: "Pinterest" },
];

const REFERRER_PATTERNS: Array<{ pattern: string; platform: string }> = [
    { pattern: "instagram.com", platform: "Instagram" },
    { pattern: "youtube.com", platform: "YouTube" },
    { pattern: "youtu.be", platform: "YouTube" },
    { pattern: "tiktok.com", platform: "TikTok" },
    { pattern: "twitter.com", platform: "X" },
    { pattern: "t.co", platform: "X" },
    { pattern: "x.com", platform: "X" },
    { pattern: "facebook.com", platform: "Facebook" },
    { pattern: "fb.com", platform: "Facebook" },
    { pattern: "linkedin.com", platform: "LinkedIn" },
    { pattern: "whatsapp.com", platform: "WhatsApp" },
    { pattern: "wa.me", platform: "WhatsApp" },
    { pattern: "snapchat.com", platform: "Snapchat" },
    { pattern: "reddit.com", platform: "Reddit" },
    { pattern: "pinterest.com", platform: "Pinterest" },
    { pattern: "telegram.org", platform: "Telegram" },
    { pattern: "t.me", platform: "Telegram" },
    { pattern: "threads.net", platform: "Threads" },
    { pattern: "google.com", platform: "Google" },
    { pattern: "bing.com", platform: "Bing" },
];

export function detectPlatform(
    referrer: string | null,
    userAgent: string | null,
    utmSource?: string | null
): string {
    // ── 1. UTM Source (highest priority, most reliable) ──
    if (utmSource) {
        const normalized = utmSource.toLowerCase().trim();
        const mapped = UTM_TO_PLATFORM[normalized];
        if (mapped) return mapped;
        // If utm_source is set but not in our map, capitalize and return it directly
        return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    }

    // ── 2. User-Agent Detection (catches in-app browsers) ──
    if (userAgent) {
        const ua = userAgent.toLowerCase();
        for (const { pattern, platform } of UA_PATTERNS) {
            if (ua.includes(pattern)) return platform;
        }
    }

    // ── 3. Referrer Detection (works when referrer isn't stripped) ──
    if (referrer && referrer.length > 0) {
        const r = referrer.toLowerCase();
        for (const { pattern, platform } of REFERRER_PATTERNS) {
            if (r.includes(pattern)) return platform;
        }
        // Unknown referrer — extract hostname
        try {
            const url = new URL(referrer);
            const host = url.hostname.replace("www.", "");
            return host;
        } catch {
            // Invalid URL, fall through
        }
    }

    // ── 4. Default ──
    return "Direct";
}

export function detectDevice(userAgent: string | null): string {
    if (!userAgent) return "Unknown";
    const ua = userAgent.toLowerCase();

    if (ua.includes("iphone") || ua.includes("android") && ua.includes("mobile")) {
        return "Mobile";
    }
    if (ua.includes("ipad") || (ua.includes("android") && !ua.includes("mobile"))) {
        return "Tablet";
    }
    return "Desktop";
}
