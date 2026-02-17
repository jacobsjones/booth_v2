"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BookingSuccessContent() {
    const searchParams = useSearchParams();
    const studioId = searchParams.get("studioId");

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow">
                    <svg className="w-10 h-10 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold italic">Booking Requested!</h1>
                <p className="text-muted-foreground">
                    Your request to book studio <span className="text-white font-semibold">#{studioId || "N/A"}</span> has been sent. They&apos;ll review it and get back to you within 24 hours.
                </p>
                <div className="bg-card border border-surface-50/30 p-6 rounded-3xl text-left shadow-xl">
                    <h3 className="text-sm font-bold mb-3 uppercase tracking-widest text-accent">Next Steps</h3>
                    <ul className="text-xs text-muted space-y-3">
                        <li className="flex gap-3">
                            <span className="text-accent text-lg leading-none">•</span>
                            Host reviews your equipment requirements
                        </li>
                        <li className="flex gap-3">
                            <span className="text-accent text-lg leading-none">•</span>
                            Payment processed only upon host approval
                        </li>
                        <li className="flex gap-3">
                            <span className="text-accent text-lg leading-none">•</span>
                            Session confirmation email with access details
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-3 pt-6">
                    <Link
                        href="/"
                        className="w-full py-4 rounded-xl bg-gradient-accent text-white font-bold hover:opacity-90 transition-all shadow-accent-glow text-sm active:scale-95"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/search"
                        className="w-full py-4 rounded-xl bg-surface-50 text-white font-bold hover:bg-surface-lighter transition-all text-sm border border-white/5"
                    >
                        Explore More Studios
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function BookingSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted">Loading confirmation...</div>}>
            <BookingSuccessContent />
        </Suspense>
    );
}
