"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navigation() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 py-4"
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5">
                        <img
                            src="/logo.png"
                            alt="Linklytics"
                            className="w-8 h-8 object-contain"
                        />
                        <span className="text-lg font-semibold text-white/90">Linklytics</span>
                    </Link>

                    {/* Desktop Navigation - Center */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="#features"
                            className="text-sm text-white/50 hover:text-white/90 transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-sm text-white/50 hover:text-white/90 transition-colors"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-sm text-white/50 hover:text-white/90 transition-colors flex items-center gap-1"
                        >
                            Pricing
                            <ChevronDown className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-sm text-white/50 hover:text-white/90 transition-colors px-4 py-2"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/signup"
                            className="text-sm px-5 py-2.5 bg-white text-slate-900 font-medium rounded-full hover:bg-white/90 transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white/70 p-2"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden mt-6 pb-6 border-t border-white/10 pt-6"
                    >
                        <div className="flex flex-col gap-4">
                            <Link
                                href="#features"
                                className="text-white/60 hover:text-white transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="text-white/60 hover:text-white transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                How It Works
                            </Link>
                            <Link
                                href="/pricing"
                                className="text-white/60 hover:text-white transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Pricing
                            </Link>
                            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
                                <Link
                                    href="/login"
                                    className="text-white/60 hover:text-white transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="text-center py-3 bg-white text-slate-900 font-medium rounded-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
