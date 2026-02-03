"use client";

import React from "react";
import Link from "next/link";
import { InstagramIcon, YouTubeIcon, TikTokIcon, XIcon } from "../icons/PlatformIcons";

const footerLinks = {
    product: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Sign Up", href: "/signup" },
        { label: "Sign In", href: "/login" },
    ],
    legal: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
    ],
};

export default function Footer() {
    return (
        <footer className="relative bg-[#0a0a0f] border-t border-white/10 mt-32">
            <div className="container mx-auto px-6 pt-24 pb-16">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <img
                                src="/logo.png"
                                alt="Linklytics"
                                className="w-8 h-8 object-contain"
                            />
                            <span className="text-xl font-bold text-white">Linklytics</span>
                        </Link>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Know which short actually sends traffic. Clear attribution for creators.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <InstagramIcon className="w-5 h-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors"
                                aria-label="YouTube"
                            >
                                <YouTubeIcon className="w-5 h-5" />
                            </a>
                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors"
                                aria-label="TikTok"
                            >
                                <TikTokIcon className="w-5 h-5" />
                            </a>
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors"
                                aria-label="X"
                            >
                                <XIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Linklytics. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                            Terms and Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
