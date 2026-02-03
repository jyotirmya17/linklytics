export function detectPlatform(referrer: string | null, userAgent: string | null): string {
    const ua = userAgent?.toLowerCase() || "";
    const r = referrer?.toLowerCase() || "";

    // 1. Check User Agent for embedded browsers/apps
    if (ua.includes("whatsapp") || ua.includes("wa/") || ua.includes("whatsapp/")) return "WhatsApp";
    if (ua.includes("instagram")) return "Instagram";
    if (ua.includes("fbav") || ua.includes("messenger")) return "Facebook";
    if (ua.includes("linkedin")) return "LinkedIn";
    if (ua.includes("tiktok")) return "TikTok";

    // 2. Check Referrer
    if (!referrer || r === "") return "Direct";

    if (r.includes("instagram.com")) return "Instagram";
    if (r.includes("youtube.com") || r.includes("youtu.be")) return "YouTube";
    if (r.includes("tiktok.com")) return "TikTok";
    if (r.includes("twitter.com") || r.includes("t.co") || r.includes("x.com")) return "X";
    if (r.includes("facebook.com") || r.includes("fb.com")) return "Facebook";
    if (r.includes("linkedin.com")) return "LinkedIn";
    if (r.includes("whatsapp.com") || r.includes("wa.me")) return "WhatsApp";

    // 3. Extract hostname for unknown referrers
    try {
        const url = new URL(referrer);
        const host = url.hostname.replace("www.", "");
        return host === "direct.com" ? "Direct" : host;
    } catch (e) {
        return "Direct";
    }
}

export function detectDevice(userAgent: string | null): string {
    if (!userAgent) return "Unknown";
    const ua = userAgent.toLowerCase();

    if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
        return "Mobile";
    }
    return "Desktop";
}
