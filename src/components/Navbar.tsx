"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 hidden lg:block">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-accent-glow transform transition-transform group-hover:scale-110">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18V5l12-2v13" />
                                <circle cx="6" cy="18" r="3" />
                                <circle cx="18" cy="16" r="3" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-white">BOOTH</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <NavLink href="/" active={pathname === "/"}>Explore</NavLink>
                        <NavLink href="/search" active={pathname === "/search"}>Studios</NavLink>
                        <NavLink href="/bookings" active={pathname === "/bookings"}>My Bookings</NavLink>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="px-6 py-2.5 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors text-sm font-bold border border-white/5">
                            Sign In
                        </button>
                        <button className="px-6 py-2.5 rounded-xl bg-accent text-white hover:opacity-90 transition-all text-sm font-bold shadow-glow">
                            List a Studio
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavLink({
    href,
    active,
    children,
}: {
    href: string;
    active: boolean;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${active
                    ? "text-accent bg-accent/10"
                    : "text-text-secondary hover:text-white hover:bg-white/5"
                }`}
        >
            {children}
        </Link>
    );
}
