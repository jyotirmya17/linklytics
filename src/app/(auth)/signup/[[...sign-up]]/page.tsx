"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SignUp } from "@clerk/nextjs";

const features = [
    "Unlimited tracking links",
    "Platform attribution",
    "Real-time analytics",
    "No credit card required",
];


export default function SignupPage() {

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden py-12">
            {/* Background gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md mx-auto px-6 flex flex-col items-center">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">L</span>
                        </div>
                        <span className="text-2xl font-bold text-white">Linklytics</span>
                    </Link>
                </motion.div>

                {/* Clerk Sign Up */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <SignUp
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "bg-[#0f0f16] border border-white/10 shadow-xl",
                                headerTitle: "text-white",
                                headerSubtitle: "text-slate-400",
                                socialButtonsBlockButton: "text-white border-white/10 hover:bg-white/5",
                                socialButtonsBlockButtonText: "text-white",
                                dividerLine: "bg-slate-700",
                                dividerText: "text-slate-500",
                                formFieldLabel: "text-slate-300",
                                formFieldInput: "bg-slate-800/50 border-slate-700 text-white",
                                footerActionText: "text-slate-400",
                                footerActionLink: "text-primary-400 hover:text-primary-300"
                            },
                        }}
                    />
                </motion.div>
            </div>
        </main>
    );
}
