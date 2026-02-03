"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { detectPlatform, detectDevice } from "@/lib/detect-platform";
import { Loader2 } from "lucide-react";

export default function RedirectPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    // Debug logging
    useEffect(() => {
        if (slug) console.log("Resolving slug:", slug);
    }, [slug]);

    const link = useQuery(api.links.getBySlug, { slug: slug || "" });
    const logClick = useMutation(api.links.logClick);

    useEffect(() => {
        if (link === undefined) return; // Loading

        if (link === null) {
            console.error("Link lookup returned null for slug:", slug);
            // Link not found
            router.replace("/404");
            return;
        }

        const performRedirect = async () => {
            // Basic tracking
            const referrer = document.referrer;
            const userAgent = navigator.userAgent;
            const platform = detectPlatform(referrer, userAgent);
            const device = detectDevice(userAgent);

            try {
                await logClick({
                    linkId: link._id,
                    platform,
                    referrer: referrer || undefined,
                    userAgent,
                    device
                    // Country/City would typically be done via headers/Edge function 
                    // but we'll skip for this client-side impl
                });
            } catch (err) {
                console.error("Failed to log click", err);
            } finally {
                // Always redirect even if logging fails
                window.location.href = link.destinationUrl;
            }
        };

        performRedirect();

    }, [link, router, logClick]);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
            <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            <p className="mt-4 text-slate-400 text-sm">Redirecting...</p>
        </div>
    );
}
