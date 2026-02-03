"use client";

import { UserProfile, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Shield, CreditCard, User, Bell } from "lucide-react";

export default function SettingsPage() {
    const { user } = useUser();

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
                <p className="text-slate-400 font-medium">Manage your account and subscription preferences.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Navigation (Sticky on desktop) */}
                <div className="xl:col-span-3">
                    <div className="bg-[#0f0f16] rounded-2xl border border-white/5 p-2 sticky top-8">
                        {[
                            { id: "profile", label: "Profile", icon: User },
                            { id: "billing", label: "Billing & Plans", icon: CreditCard },
                            { id: "security", label: "Security", icon: Shield },
                            { id: "notifications", label: "Notifications", icon: Bell },
                        ].map((item, i) => (
                            <button
                                key={item.id}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${i === 0
                                        ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="xl:col-span-9 space-y-6">
                    {/* Clerk Profile Section */}
                    <div className="bg-[#0f0f16] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                        <div className="p-8 border-b border-white/5">
                            <h2 className="text-xl font-bold text-white">Profile Information</h2>
                            <p className="text-slate-400 text-sm mt-1">Update your personal details and how others see you.</p>
                        </div>
                        <div className="p-8">
                            <UserProfile
                                appearance={{
                                    baseTheme: undefined,
                                    elements: {
                                        rootBox: "w-full !m-0 !p-0 max-w-none shadow-none",
                                        card: "bg-transparent border-none shadow-none !p-0 !m-0 w-full",
                                        navbar: "hidden", // Hide clerk navbar since we have our own
                                        headerTitle: "hidden",
                                        headerSubtitle: "hidden",
                                        pageScrollBox: "p-0",
                                        scrollBox: "bg-transparent",
                                        profileSectionTitleText: "text-white font-bold",
                                        profileSectionContent: "text-slate-400",
                                        userPreviewMainIdentifier: "text-white",
                                        userPreviewSecondaryIdentifier: "text-slate-400",
                                        formButtonPrimary: "bg-primary-600 hover:bg-primary-700 text-white",
                                        formFieldLabel: "text-slate-400",
                                        formFieldInput: "bg-white/5 border-white/10 text-white focus:border-primary-500",
                                        breadcrumbs: "hidden"
                                    },
                                    variables: {
                                        colorPrimary: "#3b82f6",
                                        colorBackground: "transparent",
                                        colorText: "white",
                                        colorTextSecondary: "#94a3b8"
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Subscription Preview Card */}
                    <div className="bg-[#0f0f16] rounded-3xl border border-white/5 p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white">Current Plan</h2>
                                <p className="text-slate-400 text-sm mt-1">You are currently on the Free plan.</p>
                            </div>
                            <span className="bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {[
                                { label: "Links Used", value: "0 / 2", percentage: 0 },
                                { label: "Analytics History", value: "7 Days", percentage: 100 },
                                { label: "Custom Domains", value: "0 / 0", percentage: 0 },
                            ].map((stat) => (
                                <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tight mb-2">{stat.label}</p>
                                    <p className="text-lg font-bold text-white">{stat.value}</p>
                                    <div className="w-full h-1 bg-white/5 rounded-full mt-3 overflow-hidden">
                                        <div className="h-full bg-primary-500" style={{ width: `${stat.percentage}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-primary-500/20 active:scale-95">
                            Upgrade My Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
