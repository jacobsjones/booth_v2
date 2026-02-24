"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    {
        label: "Home", href: "/", icon: (active: boolean) => (
            <svg className={`w-6 h-6 ${active ? "text-accent" : "text-text-muted"}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        )
    },
    {
        label: "Bookings", href: "/bookings", icon: (active: boolean) => (
            <svg className={`w-6 h-6 ${active ? "text-accent" : "text-text-muted"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    { label: "Mic", href: "/search", isCenter: true },
    {
        label: "Saved", href: "/saved", icon: (active: boolean) => (
            <svg className={`w-6 h-6 ${active ? "text-[#A855F7]" : "text-text-muted"}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        )
    },
    {
        label: "Profile", href: "/profile", icon: (active: boolean) => (
            <svg className={`w-6 h-6 ${active ? "text-[#A855F7]" : "text-text-muted"}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        )
    },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 lg:hidden">
            <div className="bg-[#0f0f18]/90 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-2 flex items-center justify-between shadow-2xl relative">
                {NAV_ITEMS.map((item, idx) => {
                    if (item.isCenter) {
                        return (
                            <div key={idx} className="absolute left-1/2 -translate-x-1/2 -top-10">
                                <Link
                                    href={item.href}
                                    className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center text-white shadow-accent-glow transform transition-transform active:scale-90"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </Link>
                            </div>
                        );
                    }

                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={idx}
                            href={item.href}
                            className="flex flex-col items-center justify-center flex-1 py-1"
                        >
                            {item.icon?.(isActive)}
                            <span className={`text-[10px] mt-1 font-medium ${isActive ? "text-accent" : "text-text-muted"}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
