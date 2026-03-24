"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, TrendingUp, Calendar, ArrowRight, Loader2, Plus as PlusIcon, Clock, MessageSquare, Info } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

export default function Dashboard() {
    const { user } = useUser();
    const stats = useQuery(api.links.getStats);
    const [activeTab, setActiveTab] = useState("DETAILS");

    if (!stats) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
        );
    }

    const topPlatform = stats?.topReferrers?.[0]?.name || "Direct";
    const cleanTopPlatform = topPlatform === "direct.com" ? "Direct" : topPlatform;

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-10">
            {/* Split Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

                {/* Left Panel: Primary Content */}
                <div className="xl:col-span-7 space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, {user?.firstName || "John"}</h1>
                            <p className="text-slate-400 mt-1 font-medium">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-primary-400 font-medium text-sm">
                                <Link href="/dashboard" className="underline underline-offset-4 cursor-pointer">Dashboard</Link>
                                <Link href="/dashboard/links" className="text-slate-700 ml-2 cursor-pointer hover:text-white transition-colors">Links</Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Chart Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0f0f16] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-slate-400 text-sm font-medium">Link clicks</span>
                                </div>
                                <p className="text-5xl font-bold text-white tracking-tighter">{(stats?.totalClicks || 0).toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 bg-white/5 border border-white/5 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-white/10 transition-colors">
                                Last 7 days <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats?.clickHistory || []}>
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }}
                                        dy={15}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#chartGradient)"
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Referrer Table Card */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-4">
                            <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Referrer</h3>
                            <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Visits</h3>
                        </div>
                        <div className="space-y-2">
                            {(stats?.topReferrers || []).map((item, i) => {
                                const cleanName = item.name === "direct.com" ? "Direct" : item.name;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center justify-between p-4 hover:bg-white/[0.02] rounded-2xl transition-all group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-primary-500 transition-colors">
                                                {i === 0 && <div className="w-2.5 h-2.5 bg-primary-500 rounded-sm" />}
                                            </div>
                                            <div className={`w-2.5 h-2.5 rounded-full ${item.color || "bg-slate-500"}`} />
                                            <span className="text-slate-300 group-hover:text-white font-medium transition-colors">{cleanName === "Direct" ? "Direct" : cleanName.toLowerCase().endsWith(".com") ? cleanName.toLowerCase() : cleanName.toLowerCase() + ".com"}</span>
                                        </div>
                                        <span className="text-slate-400 font-mono text-sm">{(item.visits || 0).toLocaleString()}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Stats & Platform Breakdown */}
                <div className="xl:col-span-5 space-y-6">
                    {/* Top Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: "Total clicks", value: stats?.totalClicks || 0 },
                            { label: "Unique visitors", value: stats?.totalVisitors || 0 },
                            { label: "Platforms", value: stats?.topReferrers?.length || 0 }
                        ].map((stat, i) => (
                            <div key={i} className="bg-[#0f0f16] p-5 rounded-2xl border border-white/5 shadow-lg">
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tight whitespace-nowrap">{stat.label}</span>
                                <p className="text-2xl font-bold text-white tracking-tighter mt-2">{(stat.value || 0).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>

                    {/* All Platforms Breakdown Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[2.5rem] p-8 shadow-2xl relative"
                    >
                        <Link href="/dashboard/links" className="absolute top-8 right-8 w-10 h-10 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-500/30 hover:bg-primary-500 transition-colors">
                            <ExternalLink className="w-5 h-5" />
                        </Link>

                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 leading-none">Platform Stats</h2>
                                <p className="text-slate-400 text-sm mt-1 leading-snug max-w-[220px]">Click distribution across all platforms</p>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-6 border-b border-slate-100 mb-6 overflow-x-auto">
                            {["DETAILS", "ACTIVITY", "NOTES"].map((tab) => (
                                <span
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`text-[10px] font-black tracking-widest pb-3 cursor-pointer transition-all ${activeTab === tab ? "text-primary-600 border-b-2 border-primary-600" : "text-slate-300 hover:text-slate-400"}`}
                                >
                                    {tab}
                                </span>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === "DETAILS" && (
                                <motion.div
                                    key="details"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-4"
                                >
                                    {(stats?.topReferrers || []).length > 0 ? (
                                        stats?.topReferrers?.map((platform, i) => {
                                            const name = platform.name === "direct.com" ? "Direct" : platform.name;
                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -5 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="flex items-center gap-4"
                                                >
                                                    <div className={`w-3 h-3 rounded-full shrink-0 ${platform.color || "bg-slate-400"}`} />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <span className="text-sm font-bold text-slate-800 truncate">{name}</span>
                                                            <div className="flex items-center gap-3 shrink-0">
                                                                <span className="text-xs font-bold text-slate-500">{platform.visits} clicks</span>
                                                                <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full">{platform.percentage}%</span>
                                                            </div>
                                                        </div>
                                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${platform.percentage || 0}%` }}
                                                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                                                className={`h-full rounded-full ${platform.color || "bg-slate-400"}`}
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-10 text-slate-300">
                                            <TrendingUp className="w-12 h-12 mb-2 opacity-20" />
                                            <p className="text-sm font-medium">No platform data yet</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === "ACTIVITY" && (
                                <motion.div
                                    key="activity"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-3"
                                >
                                    {(stats?.recentClicks || []).length > 0 ? (
                                        stats?.recentClicks?.map((click, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                                        <Clock className="w-4 h-4 text-primary-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-900">{click.linkName}</p>
                                                        <p className="text-[10px] text-slate-400">{click.location} • {new Date(click.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-black text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{click.platform}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-10 text-slate-300">
                                            <Clock className="w-12 h-12 mb-2 opacity-20" />
                                            <p className="text-sm font-medium">No recent activity</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === "NOTES" && (
                                <motion.div
                                    key="notes"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="p-6 rounded-3xl bg-primary-50 border border-primary-100 relative overflow-hidden group">
                                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-200/20 rounded-full blur-2xl group-hover:bg-primary-200/40 transition-all" />
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                                                <MessageSquare className="w-5 h-5 text-primary-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Platform Insights</h3>
                                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                                    {stats?.platformNotes?.[cleanTopPlatform] || "We are currently analyzing this traffic source to provide more granular insights into user behavior and conversion patterns."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                            <div className="flex items-center gap-2 mb-2 text-primary-500">
                                                <TrendingUp className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Growth</span>
                                            </div>
                                            <p className="text-xs font-bold text-slate-900">Steady volume from mobile devices.</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                            <div className="flex items-center gap-2 mb-2 text-emerald-500">
                                                <Info className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Tip</span>
                                            </div>
                                            <p className="text-xs font-bold text-slate-900">Add ?utm_source=platform to your link for accurate tracking.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Footer Date/Context */}
                    <div className="flex justify-end pt-4">
                        <div className="flex items-center gap-2 text-slate-500 bg-[#0f0f16] px-4 py-2 rounded-xl border border-white/5 text-xs font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



