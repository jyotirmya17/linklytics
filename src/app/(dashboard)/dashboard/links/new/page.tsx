"use client";

import { useState, useEffect } from "react";
import { useMutation, useConvexAuth } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Link as LinkIcon, Wand2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function CreateLinkPage() {
    const router = useRouter();
    const createLink = useMutation(api.links.create);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        destinationUrl: "",
        slug: "",
        name: "" // Optional name
    });

    const generateSlug = () => {
        const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData(prev => ({ ...prev, slug: result }));
    };

    const { isAuthenticated, isLoading: isConvexLoading } = useConvexAuth();
    const { getToken } = useAuth();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getToken({ template: "convex" });
            console.log("Convex Auth State:", { isAuthenticated, isConvexLoading });
            console.log("Clerk Token (convex template):", token ? "Present" : "Missing");

            if (!token) {
                toast.error("CONFIGURATION ERROR: JWT Template 'convex' is missing in Clerk Dashboard.");
            }
        };
        checkAuth();
    }, [isAuthenticated, isConvexLoading, getToken]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.destinationUrl || !formData.slug) return;

        setLoading(true);
        try {
            await createLink({
                destinationUrl: formData.destinationUrl,
                slug: formData.slug,
                name: formData.name || undefined
            });
            toast.success("Link created successfully!");
            router.push("/dashboard");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create link";
            toast.error(errorMessage);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link href="/dashboard" className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to dashboard
                </Link>
                <h1 className="text-3xl font-bold text-white">Create New Link</h1>
                <p className="text-slate-400 mt-2">Start tracking your content performance across platforms.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#0f0f16] border border-white/5 rounded-2xl p-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Destination URL</label>
                    <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="url"
                            required
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all placeholder:text-slate-600"
                            value={formData.destinationUrl}
                            onChange={(e) => setFormData({ ...formData, destinationUrl: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Short Link</label>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">linklytics.com/r/</span>
                            <input
                                type="text"
                                required
                                placeholder="my-cool-link"
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-32 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all placeholder:text-slate-600"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={generateSlug}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors"
                                title="Generate random slug"
                            >
                                <Wand2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Link Name (Optional)</label>
                    <input
                        type="text"
                        placeholder="e.g. Summer Campaign Reel"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all placeholder:text-slate-600"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Link"}
                    </button>
                </div>
            </form>
        </div>
    );
}
