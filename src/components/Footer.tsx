import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-surface-400 border-t border-surface-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18V5l12-2v13" />
                                    <circle cx="6" cy="18" r="3" />
                                    <circle cx="18" cy="16" r="3" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold">Booth</span>
                        </Link>
                        <p className="text-muted text-sm leading-relaxed">
                            The marketplace for recording studios. Find your perfect sound,
                            book your session.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-4 text-muted-foreground uppercase tracking-wider">
                            Explore
                        </h4>
                        <ul className="space-y-3">
                            <FooterLink href="/search">Find Studios</FooterLink>
                            <FooterLink href="#">How It Works</FooterLink>
                            <FooterLink href="#">Pricing</FooterLink>
                            <FooterLink href="#">Blog</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-4 text-muted-foreground uppercase tracking-wider">
                            Hosts
                        </h4>
                        <ul className="space-y-3">
                            <FooterLink href="#">List Your Studio</FooterLink>
                            <FooterLink href="#">Host Resources</FooterLink>
                            <FooterLink href="#">Community</FooterLink>
                            <FooterLink href="#">Insurance</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-4 text-muted-foreground uppercase tracking-wider">
                            Support
                        </h4>
                        <ul className="space-y-3">
                            <FooterLink href="#">Help Centre</FooterLink>
                            <FooterLink href="#">Contact Us</FooterLink>
                            <FooterLink href="#">Privacy Policy</FooterLink>
                            <FooterLink href="#">Terms of Service</FooterLink>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-surface-50/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-muted text-sm">
                        © 2026 Booth. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <SocialIcon label="Twitter">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </SocialIcon>
                        <SocialIcon label="Instagram">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <circle cx="12" cy="12" r="5" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </SocialIcon>
                        <SocialIcon label="YouTube">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                        </SocialIcon>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <li>
            <Link
                href={href}
                className="text-muted text-sm hover:text-white transition-colors"
            >
                {children}
            </Link>
        </li>
    );
}

function SocialIcon({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href="#"
            aria-label={label}
            className="w-10 h-10 rounded-lg bg-surface-50 flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-colors text-muted"
        >
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {children}
            </svg>
        </a>
    );
}
