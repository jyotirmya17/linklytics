"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, TrendingDown, Zap, Calendar, ChevronDown, ExternalLink } from "lucide-react";

// Dashboard Preview Component
function DashboardPreview() {
    return (
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Dashboard Panel */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="lg:col-span-7 bg-[#0f0f16] rounded-xl border border-white/5 overflow-hidden shadow-2xl ring-1 ring-white/10"
            >
                {/* Browser Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="Linklytics"
                                className="w-6 h-6 object-contain"
                            />
                            <span className="text-white font-medium">Linklytics</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            <span className="text-primary-400 font-medium">Dashboard</span>
                            <span className="text-slate-400">Links</span>
                        </div>
                    </div>

                    {/* Welcome */}
                    <div className="mb-8">
                        <h3 className="text-white font-semibold text-lg mb-1">Welcome back, John</h3>
                        <p className="text-slate-500 text-sm">Nov 24, 2023</p>
                    </div>

                    {/* Chart Section */}
                    <div className="bg-[#13131f] rounded-xl p-5 border border-white/5 mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-slate-400 text-sm">Link clicks</span>
                                    <span className="text-xs bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded font-medium">+40%</span>
                                </div>
                                <p className="text-3xl font-bold text-white tracking-tight">25,400</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span>Anually</span>
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="relative h-24 w-full">
                            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
                                        <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M0,85 C50,83 100,80 150,70 C200,60 250,55 300,45 C350,35 400,30 400,30"
                                    fill="none"
                                    stroke="url(#lineGradient)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#10b981" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M0,85 C50,83 100,80 150,70 C200,60 250,55 300,45 C350,35 400,30 400,30 V100 H0 Z"
                                    fill="url(#chartGradient)"
                                />
                            </svg>
                            <div className="absolute -bottom-1 left-0 right-0 flex justify-between text-[10px] text-slate-600 px-2 font-medium">
                                <span>JUL</span>
                                <span>AUG</span>
                                <span>SEP</span>
                                <span>OCT</span>
                                <span>NOV</span>
                            </div>
                        </div>
                    </div>

                    {/* Referrer List */}
                    <div>
                        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-4 px-2">
                            <span>Referrer</span>
                            <span>Visits</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                { name: "youtube.com", visits: "15,491", color: "bg-[#ff0000]", checked: true },
                                { name: "twitter.com", visits: "8,602", color: "bg-[#1da1f2]", checked: false },
                                { name: "facebook.com", visits: "2,331", color: "bg-[#1877f2]", checked: false },
                                { name: "google.com", visits: "1,704", color: "bg-[#0f9d58]", checked: false },
                                { name: "instagram.com", visits: "727", color: "bg-[#e1306c]", checked: false },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between px-2 group cursor-pointer hover:bg-white/5 rounded-lg py-1 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded border transition-colors ${item.checked ? 'bg-primary-600 border-primary-600' : 'border-slate-700 bg-transparent'} flex items-center justify-center`}>
                                            {item.checked && <span className="text-white text-[10px]">✓</span>}
                                        </div>
                                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{item.name}</span>
                                    </div>
                                    <span className="text-sm text-slate-500 font-mono">{item.visits}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Right Side Panels */}
            <div className="lg:col-span-5 space-y-5">
                {/* Stat Cards Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="grid grid-cols-3 gap-3"
                >
                    {[
                        { label: "Link clicks", value: "25,400", change: "+43%", up: true },
                        { label: "Link visitors", value: "915", change: "-29%", up: false },
                        { label: "Link referrers", value: "9", change: "+41%", up: true },
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#0f0f16] rounded-xl p-3 border border-white/5 shadow-lg">
                            <div className="flex items-center flex-wrap gap-1.5 mb-2">
                                <span className="text-[10px] text-slate-400 leading-tight">{stat.label}</span>
                                <span className={`text-[10px] font-medium ${stat.up ? 'text-emerald-400' : 'text-rose-400'}`}>{stat.change}</span>
                            </div>
                            <p className="text-lg font-bold text-white">{stat.value}</p>
                        </div>
                    ))}
                </motion.div>

                {/* YouTube Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="bg-white rounded-2xl p-5 shadow-2xl relative overflow-hidden"
                >
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#ff0000] flex items-center justify-center shrink-0 shadow-lg shadow-red-500/20">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-lg">YouTube</h4>
                                <p className="text-xs text-slate-500 leading-tight">Enjoy the videos and music you love, upload original content...</p>
                            </div>
                        </div>
                        <button className="w-8 h-8 rounded-lg bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center transition-colors shadow-lg shadow-primary-500/20">
                            <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-6 border-b border-slate-100 mb-5 text-[11px] font-bold tracking-wide">
                        <span className="text-primary-600 pb-2 border-b-2 border-primary-600 cursor-pointer">DETAILS</span>
                        <span className="text-slate-400 pb-2 cursor-pointer hover:text-slate-600 transition-colors">ACTIVITY</span>
                        <span className="text-slate-400 pb-2 cursor-pointer hover:text-slate-600 transition-colors">NOTES</span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        {/* Column 1 */}
                        <div>
                            <div className="mb-4">
                                <p className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">REFERRER</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff0000]" />
                                    <span className="text-sm font-medium text-slate-700">youtube.com</span>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <p className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">VISITS</p>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                                    <span className="text-sm font-medium text-slate-700">15,491</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">DISTRIBUTION</p>
                                <span className="text-xs font-medium text-slate-600">67% 📊 (High)</span>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">DISTRIBUTION</p>
                            <div className="space-y-2.5">
                                {[
                                    { color: "bg-red-500", value: "4.4%" },
                                    { color: "bg-blue-500", value: "2.8%" },
                                    { color: "bg-pink-500", value: "2.3%" },
                                    { color: "bg-yellow-500", value: "6.7%" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${parseFloat(item.value) * 10}%` }} />
                                        </div>
                                        <span className="text-[10px] font-medium text-slate-500 w-7 text-right">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Date Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="flex justify-end"
                >
                    <div className="inline-flex items-center gap-2 bg-[#0f0f16] rounded-lg px-4 py-2 border border-white/5 shadow-lg text-slate-400 hover:text-white transition-colors cursor-pointer">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Nov 24, 2023</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function Hero() {
    return (
        <section className="relative min-h-screen bg-[#0a0a0f] overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-1/4 left-0 right-0 h-[600px]"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(34, 197, 94, 0.03) 30%, rgba(59, 130, 246, 0.05) 60%, transparent 100%)',
                        transform: 'skewY(-3deg)',
                    }}
                />
                <div
                    className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
                <div
                    className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
                <div
                    className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
            </div>

            {/* Main content */}
            <div className="relative container mx-auto px-6 pt-[80px] pb-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    {/* Small badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative mt-12 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                    >
                        <Zap className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="text-xs font-medium text-white/70">Creator analytics made simple</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-6 leading-[1.15] tracking-[-0.02em]"
                    >
                        See which short-form content
                        <br />
                        <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                            actually drives traffic
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed"
                    >
                        One link for all platforms. Real-time analytics that show exactly which Instagram Reel, YouTube Short, or TikTok brings clicks.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/signup"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg shadow-white/10"
                        >
                            Start Free
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link
                            href="#features"
                            className="inline-flex items-center gap-2 px-6 py-4 text-white/70 font-medium hover:text-white transition-colors"
                        >
                            See how it works
                        </Link>
                    </motion.div>

                    {/* Social proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-10 flex items-center justify-center gap-6 text-sm text-white/40"
                    >
                        <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Free forever plan</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> No credit card</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 2 min setup</span>
                    </motion.div>
                </div>

                {/* Dashboard Preview - Real Components */}
                <DashboardPreview />
            </div>
        </section>
    );
}
