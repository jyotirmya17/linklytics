"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
    return (
        <section className="relative py-32 bg-[#0a0a0f] overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Logo with circular frame */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="mb-8 inline-flex items-center justify-center"
                    >
                        <div className="relative p-4 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30 shadow-lg shadow-primary-500/10">
                            <img
                                src="/logo.png"
                                alt="Linklytics"
                                className="w-12 h-12 object-contain"
                            />
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Stop guessing.
                        <br />
                        <span className="gradient-text">Start tracking.</span>
                    </h2>

                    {/* Subheading */}
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                        Understand exactly which shorts drive clicks—across Instagram, YouTube, TikTok, and more.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/signup"
                            className="btn-primary flex items-center gap-2 text-lg px-10 py-5"
                        >
                            Get started for free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="btn-secondary flex items-center gap-2 text-lg px-10 py-5"
                        >
                            View pricing
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500">
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            No credit card required
                        </span>
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Free forever plan
                        </span>
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Cancel anytime
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
