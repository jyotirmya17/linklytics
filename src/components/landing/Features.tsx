"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Zap, Globe, Sparkles } from "lucide-react";
import { InstagramIcon, YouTubeIcon, TikTokIcon, XIcon } from "../icons/PlatformIcons";

const features = [
    {
        icon: BarChart3,
        title: "Platform Attribution",
        description:
            "See exactly which platform—Instagram, YouTube, TikTok, or X—sends the most traffic to your links.",
        platforms: true,
    },
    {
        icon: Zap,
        title: "Instant Analytics",
        description:
            "Real-time click data with platform breakdown, geographic insights, and performance trends.",
    },
    {
        icon: Globe,
        title: "Lightning Redirects",
        description:
            "Sub-200ms redirect speeds. Your audience won't notice, but your analytics will capture everything.",
    },
    {
        icon: Sparkles,
        title: "Creator-Focused",
        description:
            "Built for creators, not enterprises. Simple interface, clear metrics, no complicated dashboards.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function Features() {
    return (
        <section id="features" className="relative py-32 bg-[#0a0a0f]">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-slate-900/30 to-[#0a0a0f]" />

            <div className="relative container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Simple, yet powerful features
                    </h2>
                    <p className="text-xl text-slate-400">
                        Everything you need to understand your audience and optimize your content strategy.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="glass-card p-8 group"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-7 h-7 text-primary-400" />
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-white mb-4">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                {feature.description}
                            </p>

                            {/* Platform icons for first feature */}
                            {feature.platforms && (
                                <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                                    <span className="text-sm text-slate-500">Supports:</span>
                                    <div className="flex items-center gap-3">
                                        <InstagramIcon className="w-5 h-5" />
                                        <YouTubeIcon className="w-5 h-5" />
                                        <TikTokIcon className="w-5 h-5" />
                                        <XIcon className="w-5 h-5" />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
