"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Copy, ExternalLink, MoreVertical, Plus, Calendar, MousePointer2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function LinksPage() {
    const links = useQuery(api.links.getAll);

    const copyToClipboard = (slug: string) => {
        const url = `${window.location.origin}/r/${slug}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">My Links</h1>
                    <p className="text-slate-400 text-sm">Manage and track your short links.</p>
                </div>
                <Link href="/dashboard/links/new">
                    <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                        <Plus className="w-4 h-4" />
                        Create Link
                    </button>
                </Link>
            </div>

            <div className="bg-[#0f0f16] rounded-xl border border-white/5 overflow-hidden">
                {links === undefined ? (
                    <div className="p-8 text-center text-slate-500">Loading links...</div>
                ) : links.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <LinkIcon className="w-6 h-6 text-slate-500" />
                        </div>
                        <h3 className="text-white font-medium mb-1">No links yet</h3>
                        <p className="text-slate-400 text-sm mb-4">Create your first link to start tracking.</p>
                        <Link href="/dashboard/links/new">
                            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                                Create Link
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {links.map((link) => (
                            <div key={link._id} className="p-4 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-white truncate">{link.name || link.slug}</h3>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${link.isActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                                            {link.isActive ? 'Active' : 'Archived'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-500">
                                        <a href={link.destinationUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary-400 transition-colors truncate max-w-[200px]">
                                            <ExternalLink className="w-3 h-3" />
                                            {link.destinationUrl}
                                        </a>
                                        <span className="text-slate-600">•</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(link.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 sm:gap-6">
                                    <div className="flex flex-col items-end">
                                        <span className="text-white font-bold text-lg">{link.clicks}</span>
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            <MousePointer2 className="w-3 h-3" /> clicks
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center bg-black/30 rounded-lg pl-3 pr-1 py-1 border border-white/10">
                                            <span className="text-slate-400 text-sm mr-2 truncate max-w-[100px] sm:max-w-none">
                                                /r/{link.slug}
                                            </span>
                                            <button
                                                onClick={() => copyToClipboard(link.slug)}
                                                className="p-1.5 hover:bg-white/10 rounded-md text-slate-400 hover:text-white transition-colors"
                                                title="Copy short link"
                                            >
                                                <Copy className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <Link href={`/dashboard/links/${link.slug}`}>
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors border border-transparent hover:border-white/10">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function LinkIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    );
}
