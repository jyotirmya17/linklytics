"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link2, Share2, TrendingUp, ArrowRight } from "lucide-react";
import { InstagramIcon, YouTubeIcon, TikTokIcon, XIcon } from "../icons/PlatformIcons";

const steps = [
    {
        number: "01",
        icon: Link2,
        title: "Create your link",
        description: "Generate a single tracking link in seconds. No technical setup required.",
        visual: "link-creation",
    },
    {
        number: "02",
        icon: Share2,
        title: "Share everywhere",
        description: "Use the same link across Instagram, YouTube, TikTok, X, and anywhere else.",
        visual: "platforms",
    },
    {
        number: "03",
        icon: TrendingUp,
        title: "Track performance",
        description: "See which platforms drive the most traffic with real-time analytics.",
        visual: "analytics",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="relative py-32 bg-[#0a0a0f] overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-[#0a0a0f] to-slate-900/30" />

            <div className="relative container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-24"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        How it works
                    </h2>
                    <p className="text-xl text-slate-400">
                        Get started in minutes with a simple three-step process.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24 last:mb-0 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Content */}
                            <div className="flex-1 text-center lg:text-left">
                                {/* Step number */}
                                <div className="inline-flex items-center gap-4 mb-6">
                                    <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                                    {step.description}
                                </p>
                            </div>

                            {/* Visual */}
                            <div className="flex-1 w-full max-w-lg">
                                <div className="glass-card p-8">
                                    {step.visual === "link-creation" && (
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                                <Link2 className="w-5 h-5 text-primary-400" />
                                                <span className="text-slate-300 font-mono text-sm flex-1 truncate">
                                                    linklytics.app/r/
                                                    <span className="text-primary-400">abc123</span>
                                                </span>
                                                <button className="px-3 py-1 text-xs font-medium text-primary-400 bg-primary-500/10 rounded-lg">
                                                    Copy
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                                                <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                                                Link created in 0.2s
                                            </div>
                                        </div>
                                    )}

                                    {step.visual === "platforms" && (
                                        <div className="flex flex-wrap items-center justify-center gap-6">
                                            {[
                                                { Icon: InstagramIcon, name: "Instagram" },
                                                { Icon: YouTubeIcon, name: "YouTube" },
                                                { Icon: TikTokIcon, name: "TikTok" },
                                                { Icon: XIcon, name: "X" },
                                            ].map((platform, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.3 + i * 0.1 }}
                                                    className="flex flex-col items-center gap-2 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors"
                                                >
                                                    <platform.Icon className="w-8 h-8" />
                                                    <span className="text-xs text-slate-400">{platform.name}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}

                                    {step.visual === "analytics" && (
                                        <div className="space-y-4">
                                            {[
                                                { platform: "Instagram", percentage: 45, color: "from-pink-500 to-purple-500" },
                                                { platform: "YouTube", percentage: 28, color: "from-red-500 to-red-600" },
                                                { platform: "TikTok", percentage: 18, color: "from-cyan-400 to-pink-500" },
                                                { platform: "X", percentage: 9, color: "from-slate-400 to-slate-500" },
                                            ].map((item, i) => (
                                                <div key={i} className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-300">{item.platform}</span>
                                                        <span className="text-slate-400">{item.percentage}%</span>
                                                    </div>
                                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${item.percentage}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                            className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
