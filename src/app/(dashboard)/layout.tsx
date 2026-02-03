"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            {/* Mobile Header */}
            <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl fixed top-0 left-0 right-0 z-40">
                <div className="flex items-center gap-2.5">
                    <img src="/logo.png" alt="Linklytics" className="w-8 h-8 object-contain" />
                    <span className="text-lg font-bold text-white tracking-tight">Linklytics</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
            />

            <main className={`transition-all duration-300 min-h-screen pt-20 lg:pt-0 ${isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"}`}>
                <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
