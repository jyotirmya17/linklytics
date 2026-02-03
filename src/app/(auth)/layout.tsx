export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#0a0a0f]">
            {/* Visual Side */}
            <div className="hidden lg:flex flex-col justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 to-black" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[100px]" />

                <div className="relative z-10">
                    <div className="mb-8 p-3 bg-white/5 w-fit rounded-xl border border-white/10 backdrop-blur-sm">
                        <img src="/logo.png" alt="Linklytics Logo" className="w-10 h-10 object-contain" />
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                        See which content <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
                            actually drives traffic
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-md">
                        One link for all platforms. Real-time analytics that show exactly which Instagram Reel, YouTube Short, or TikTok brings clicks.
                    </p>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex flex-col items-center justify-center p-6 relative">
                <div className="absolute inset-0 bg-[#0a0a0f]" />
                <div className="relative z-10 w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
