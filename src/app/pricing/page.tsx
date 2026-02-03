"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { useAction, useMutation, useConvexAuth } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { loadRazorpay } from "@/lib/razorpay";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Pricing plans data
const plans = [
    {
        name: "Free",
        description: "Perfect for getting started",
        price: 0,
        period: "forever",
        features: [
            "Unlimited links",
            "Basic analytics",
            "Platform detection",
            "7-day history",
        ],
        cta: "Get started free",
        highlighted: false,
    },
    {
        name: "Pro",
        description: "For growing creators",
        price: 499,
        period: "month",
        features: [
            "Everything in Free",
            "Custom slugs",
            "30-day history",
            "CSV export",
            "Priority support",
        ],
        cta: "Get Pro",
        highlighted: true,
    },
    {
        name: "Creator+",
        description: "For professional creators & teams",
        price: 999,
        period: "month",
        features: [
            "Everything in Pro",
            "Team workspaces",
            "Unlimited history",
            "Advanced insights",
            "API access",
        ],
        cta: "Get Creator+",
        highlighted: false,
    },
];

// Feature comparison data
const comparisonCategories = [
    {
        name: "Basics",
        features: [
            { name: "All analytics features", free: true, pro: true, creatorPlus: true },
            { name: "Link redirects", free: "Unlimited", pro: "Unlimited", creatorPlus: "Unlimited" },
            { name: "Track visits/month", free: "10,000", pro: "Unlimited", creatorPlus: "Unlimited" },
            { name: "History retention", free: "7 days", pro: "30 days", creatorPlus: "Unlimited" },
            { name: "Platform detection", free: true, pro: true, creatorPlus: true },
        ],
    },
    {
        name: "Advanced",
        features: [
            { name: "Custom slugs", free: false, pro: true, creatorPlus: true },
            { name: "CSV export", free: false, pro: true, creatorPlus: true },
            { name: "Advanced insights", free: false, pro: false, creatorPlus: true },
            { name: "Geographic data", free: false, pro: true, creatorPlus: true },
            { name: "API access", free: false, pro: false, creatorPlus: true },
        ],
    },
    {
        name: "Collaboration",
        features: [
            { name: "Workspaces", free: "1", pro: "5", creatorPlus: "Unlimited" },
            { name: "Team members", free: "1", pro: "3", creatorPlus: "Unlimited" },
            { name: "Priority support", free: false, pro: true, creatorPlus: true },
        ],
    },
];

// FAQ data
const faqs = [
    {
        question: "Is there a free trial?",
        answer: "Yes! Our Free plan is completely free forever with all basic features. You can upgrade to Pro or Creator+ anytime to unlock advanced features.",
    },
    {
        question: "Can I cancel anytime?",
        answer: "Absolutely. You can cancel your subscription at any time. Your access will continue until the end of your billing period.",
    },
    {
        question: "Can I invite my team?",
        answer: "Yes! With Creator+ plan, you can invite unlimited team members and create unlimited workspaces for collaboration.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit/debit cards, UPI, and net banking through our secure payment partner Razorpay.",
    },
    {
        question: "What happens when I reach my visit limit?",
        answer: "On the Free plan, tracking pauses when you reach 10,000 visits/month. Your links will still redirect, but new visits won't be tracked until the next month or you upgrade.",
    },
];

function FeatureValue({ value }: { value: boolean | string }) {
    if (typeof value === "boolean") {
        return value ? (
            <Check className="w-5 h-5 text-success-500 mx-auto" />
        ) : (
            <X className="w-5 h-5 text-slate-600 mx-auto" />
        );
    }
    return <span className="text-slate-300">{value}</span>;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-800 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-5 text-left"
            >
                <span className="text-lg font-medium text-white">{question}</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
            </button>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pb-5"
                >
                    <p className="text-slate-400 leading-relaxed">{answer}</p>
                </motion.div>
            )}
        </div>
    );
}



// ... existing code ...

export default function PricingPage() {
    const { isAuthenticated } = useConvexAuth();
    const router = useRouter();
    const createSubscription = useAction(api.razorpay.createSubscription);
    const verifyPayment = useMutation(api.razorpay.verifyPayment);
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (planType: "pro" | "creator_plus") => {
        if (!isAuthenticated) {
            toast.error("Please log in to upgrade");
            router.push("/login");
            return;
        }

        setLoading(planType);

        try {
            const isLoaded = await loadRazorpay();
            if (!isLoaded) {
                toast.error("Failed to load Razorpay SDK");
                return;
            }

            // TODO: Replace with environment variables
            const planId = planType === "pro"
                ? (process.env.NEXT_PUBLIC_RAZORPAY_PLAN_PRO || "plan_def123")
                : (process.env.NEXT_PUBLIC_RAZORPAY_PLAN_CREATOR_PLUS || "plan_def456");

            // 1. Create Subscription on Backend
            const { subscriptionId, keyId } = await createSubscription({ planId });

            if (!keyId) {
                toast.error("Razorpay Key ID missing in configuration");
                return;
            }

            // 2. Open Razorpay Modal
            const options = {
                key: keyId,
                subscription_id: subscriptionId,
                name: "Linklytics",
                description: `Upgrade to ${planType === "pro" ? "Pro" : "Creator+"} Plan`,
                handler: async function (response: any) {
                    try {
                        // 3. Verify Payment
                        await verifyPayment({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_subscription_id: response.razorpay_subscription_id,
                            razorpay_signature: response.razorpay_signature,
                            planType: planType,
                        });
                        toast.success("Subscription activated successfully!");
                        router.push("/dashboard");
                    } catch (err) {
                        console.error(err);
                        toast.error("Payment verification failed");
                    }
                },
                theme: {
                    color: "#8b5cf6", // Primary-500
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error(error);
            toast.error("Failed to initiate subscription");
        } finally {
            setLoading(null);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                {/* Background gradients */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
                    <div className="absolute top-20 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative container mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                    >
                        Choose Your Plan
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto"
                    >
                        We have you covered, whether you&apos;re an individual creator, a professional marketer, business or agency.
                    </motion.p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative glass-card p-8 ${plan.highlighted
                                    ? "ring-2 ring-primary-500 shadow-lg shadow-primary-500/20"
                                    : ""
                                    }`}
                            >
                                {plan.highlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-slate-400">{plan.description}</p>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-slate-400">₹</span>
                                        <span className="text-5xl font-bold text-white">{plan.price}</span>
                                        <span className="text-slate-400">/ {plan.period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-success-500 flex-shrink-0" />
                                            <span className="text-slate-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {plan.price === 0 ? (
                                    <Link
                                        href="/dashboard"
                                        className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${plan.highlighted
                                            ? "btn-primary"
                                            : "btn-secondary"
                                            }`}
                                    >
                                        {plan.cta}
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => handleSubscribe(plan.name.toLowerCase() as "pro" | "creator_plus")}
                                        disabled={loading === plan.name.toLowerCase()}
                                        className={`block w-full text-center py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${plan.highlighted
                                            ? "btn-primary"
                                            : "btn-secondary"
                                            }`}
                                    >
                                        {loading === plan.name.toLowerCase() ? (
                                            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            plan.cta
                                        )}
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans Comparison Table */}
            <section className="py-24 bg-slate-900/30">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Plans comparison
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Pick the plan that fits your needs.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto overflow-x-auto">
                        <table className="w-full">
                            {/* Header */}
                            <thead>
                                <tr className="border-b border-slate-800">
                                    <th className="text-left py-4 px-4 text-slate-400 font-medium"></th>
                                    <th className="py-4 px-4 text-center">
                                        <span className="text-xl font-bold text-white">Free</span>
                                    </th>
                                    <th className="py-4 px-4 text-center">
                                        <span className="text-xl font-bold text-primary-400">Pro</span>
                                    </th>
                                    <th className="py-4 px-4 text-center">
                                        <span className="text-xl font-bold text-white">Creator+</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {comparisonCategories.map((category) => (
                                    <React.Fragment key={category.name}>
                                        {/* Category Header */}
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="py-6 px-4 text-lg font-semibold text-white bg-slate-800/30"
                                            >
                                                {category.name}
                                            </td>
                                        </tr>
                                        {/* Features */}
                                        {category.features.map((feature) => (
                                            <tr key={feature.name} className="border-b border-slate-800/50">
                                                <td className="py-4 px-4 text-slate-300">{feature.name}</td>
                                                <td className="py-4 px-4 text-center">
                                                    <FeatureValue value={feature.free} />
                                                </td>
                                                <td className="py-4 px-4 text-center bg-primary-500/5">
                                                    <FeatureValue value={feature.pro} />
                                                </td>
                                                <td className="py-4 px-4 text-center">
                                                    <FeatureValue value={feature.creatorPlus} />
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Get answers to your questions about our product, pricing, and everything in between.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto glass-card p-8">
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
