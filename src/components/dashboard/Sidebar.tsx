"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Link2, Settings, LogOut, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: SidebarProps) {
    const pathname = usePathname();

    const links = [
        {
            label: "Overview",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "My Links",
            href: "/dashboard/links",
            icon: Link2,
        },
        {
            label: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
        },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
                fixed left-0 top-0 h-screen border-r border-white/5 bg-[#0a0a0f]/95 backdrop-blur-xl z-50 transition-all duration-300 lg:translate-x-0 group
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                ${isCollapsed ? "w-20" : "w-64"}
            `}>
                {/* Logo & Close/Toggle Button */}
                <div className={`p-6 flex items-center transition-all duration-300 ${isCollapsed ? "justify-center" : "justify-between"}`}>
                    <Link href="/dashboard" className="flex items-center gap-2.5">
                        <img src="/logo.png" alt="Linklytics" className="w-8 h-8 object-contain" />
                        {!isCollapsed && <span className="text-lg font-bold text-white tracking-tight">Linklytics</span>}
                    </Link>

                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Desktop Toggle Button */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex absolute -right-3 top-10 w-6 h-6 bg-primary-600 rounded-full items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary-500 z-50 border border-white/10"
                        title={isCollapsed ? "Expand" : "Collapse"}
                    >
                        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className={`flex-1 px-4 space-y-2 overflow-y-auto ${isCollapsed ? "flex flex-col items-center" : ""}`}>
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                title={isCollapsed ? link.label : ""}
                                className={`flex items-center transition-all duration-200 group/nav ${isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"} rounded-xl ${isActive
                                    ? "bg-primary-500/10 text-primary-400"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <link.icon className={`w-5 h-5 ${isActive ? "text-primary-400" : "text-slate-500 group-hover/nav:text-white"}`} />
                                {!isCollapsed && <span className="font-medium whitespace-nowrap">{link.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Footer */}
                <div className="p-4 border-t border-white/5">
                    <div className={`flex items-center rounded-xl bg-white/5 border border-white/5 transition-all duration-300 ${isCollapsed ? "justify-center p-2" : "gap-3 px-4 py-3"}`}>
                        <UserButton
                            appearance={{
                                elements: {
                                    rootBox: isCollapsed ? "w-auto" : "w-full",
                                    userButtonBox: `flex-row-reverse w-full justify-between ${isCollapsed ? "gap-0" : "gap-3"}`,
                                    userButtonOuterIdentifier: `text-sm font-semibold text-white !text-white pl-0 ${isCollapsed ? "hidden" : "block"}`,
                                    userButtonTrigger: "focus:shadow-none focus:outline-none"
                                }
                            }}
                            showName={!isCollapsed}
                        />
                    </div>
                </div>
            </aside>
        </>
    );
}
