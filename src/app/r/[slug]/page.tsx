"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { detectPlatform, detectDevice } from "@/lib/detect-platform";
import { Loader2 } from "lucide-react";

export default function RedirectPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const slug = params.slug as string;
    const hasLogged = useRef(false);

    const link = useQuery(api.links.getBySlug, { slug: slug || "" });
    const logClick = useMutation(api.links.logClick);

    useEffect(() => {
        if (link === undefined) return; // Loading

        if (link === null) {
            router.replace("/404");
            return;
        }

        // Guard: only log once per page load
        if (hasLogged.current) {
            window.location.href = link.destinationUrl;
            return;
        }
        hasLogged.current = true;

        const performRedirect = async () => {
            const referrer = document.referrer;
            const userAgent = navigator.userAgent;
            const utmSource = searchParams.get("utm_source");
            const platform = detectPlatform(referrer, userAgent, utmSource);
            const device = detectDevice(userAgent);

            try {
                await logClick({
                    linkId: link._id,
                    platform,
                    referrer: referrer || undefined,
                    userAgent,
                    device
                });
            } catch (err) {
                console.error("Failed to log click", err);
            } finally {
                const destUrl = new URL(link.destinationUrl);
                searchParams.forEach((value, key) => {
                    if (key.startsWith("utm_") && !destUrl.searchParams.has(key)) {
                        destUrl.searchParams.set(key, value);
                    }
                });
                window.location.href = destUrl.toString();
            }
        };

        performRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [link]);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
            <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            <p className="mt-4 text-slate-400 text-sm">Redirecting...</p>
        </div>
    );
}
