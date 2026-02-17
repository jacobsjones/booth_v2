"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
            <p className="text-muted text-sm mb-8 max-w-sm">
                We encountered an error while loading this page. Our team has been notified.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:opacity-90 transition-all text-sm"
                >
                    Try again
                </button>
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-3 rounded-xl bg-surface-50 text-white font-semibold hover:bg-surface-lighter transition-all text-sm"
                >
                    Go Home
                </button>
            </div>
        </div>
    );
}
