"use client";

import React from "react";
import { motion } from "framer-motion";

// Floating decorative element
interface FloatingElementProps {
    delay?: number;
    className?: string;
    size?: "sm" | "md" | "lg";
    color?: string;
}

export function FloatingElement({
    delay = 0,
    className = "",
    size = "md",
    color = "primary",
}: FloatingElementProps) {
    const sizes = {
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32",
    };

    const colors = {
        primary: "from-primary-500/20 to-primary-600/10",
        accent: "from-accent-500/20 to-accent-600/10",
        mixed: "from-primary-500/15 to-accent-500/15",
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.8 }}
            className={`absolute ${sizes[size]} rounded-full bg-gradient-to-br ${colors[color as keyof typeof colors] || colors.primary} blur-2xl ${className}`}
            style={{
                animation: `float ${6 + delay}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
            }}
        />
    );
}

// Geometric shape decorations
export function GeometricDecoration({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute pointer-events-none ${className}`}>
            <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-20"
            >
                <circle
                    cx="60"
                    cy="60"
                    r="58"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                />
                <defs>
                    <linearGradient
                        id="gradient1"
                        x1="0"
                        y1="0"
                        x2="120"
                        y2="120"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#8b5cf6" />
                        <stop offset="1" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

// Grid pattern background
export function GridPattern() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
                    backgroundSize: "64px 64px",
                }}
            />
        </div>
    );
}

// Gradient orbs for hero background
export function GradientOrbs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Top left orb */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />

            {/* Top right orb */}
            <div className="absolute -top-20 right-1/4 w-72 h-72 bg-accent-500/15 rounded-full blur-3xl" />

            {/* Bottom orb */}
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-primary-600/15 rounded-full blur-3xl" />

            {/* Accent orb */}
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent-400/10 rounded-full blur-3xl" />
        </div>
    );
}

export default FloatingElement;
