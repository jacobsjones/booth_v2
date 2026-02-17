"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center shadow-glow transition-shadow group-hover:shadow-[0_0_60px_rgba(106,37,244,0.4)]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18V5l12-2v13" />
                                <circle cx="6" cy="18" r="3" />
                                <circle cx="18" cy="16" r="3" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold tracking-tight">Booth</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        <NavLink href="/" active={pathname === "/"}>
                            Explore
                        </NavLink>
                        <NavLink href="/search" active={pathname === "/search"}>
                            Studios
                        </NavLink>
                        <NavLink href="#" active={false}>
                            List Your Studio
                        </NavLink>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-sm font-medium">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                            Sign In
                        </button>
                        <button className="w-9 h-9 rounded-lg bg-surface-50 flex items-center justify-center hover:bg-card-hover transition-colors md:hidden">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
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
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active
                    ? "bg-accent/15 text-accent"
                    : "text-muted-foreground hover:text-white hover:bg-surface-50"
                }`}
        >
            {children}
        </Link>
    );
}
