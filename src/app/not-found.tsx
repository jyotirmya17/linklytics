import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center">
                        <AlertCircle className="w-10 h-10 text-slate-400" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-white tracking-tight">Link not found</h1>
                <p className="text-slate-400 text-lg">
                    The short link you are looking for doesn't exist or has been removed.
                </p>

                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
