"use client";

import Link from "next/link";
export default function BookingSuccessPage() {
    // Hardcoding details to match the screenshot for ease.
    // In a real app we would fetch the booking ID from searchParams and look up the data.
    return (
        <div className="min-h-screen bg-surface flex flex-col items-center pt-12 p-4">

            <header className="w-full max-w-md flex items-center justify-center mb-8 relative">
                <Link href="/" className="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-muted hover:bg-surface-50/30 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </Link>
                <h1 className="text-sm font-semibold tracking-wide">Booking Confirmed</h1>
            </header>

            <div className="max-w-md w-full flex flex-col items-center">
                {/* Custom glowing checkmark */}
                <div className="w-20 h-20 bg-[#A855F7] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_-5px_#A855F7]">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <h2 className="text-3xl font-bold mb-3">You&apos;re Booked!</h2>
                <p className="text-[#A1A1AA] text-center text-sm px-6 mb-10 leading-relaxed">
                    Your session at Neon Dreams Audio is secured. Time to make some hits.
                </p>

                {/* Booking Details Card */}
                <div className="w-full bg-[#120F1D] rounded-2xl overflow-hidden border border-white/5 mb-8">
                    <div className="relative h-32 w-full">
                        {/* We aren't using next/image here since it's just a static placeholder */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-80"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80")' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#120F1D] via-transparent to-transparent" />
                    </div>

                    <div className="p-5">
                        <p className="text-[10px] font-bold tracking-widest text-[#A855F7] uppercase mb-1">Studio Details</p>
                        <h3 className="text-lg font-bold mb-5">Neon Dreams Audio</h3>

                        <div className="space-y-4 text-sm text-[#A1A1AA]">
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 shrink-0 text-[#A855F7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <div>
                                    <p className="text-white font-medium">Sunday, February 25, 2024</p>
                                    <p className="text-xs">2:00 PM - 4:00 PM (2 Hours)</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <svg className="w-5 h-5 shrink-0 text-[#A855F7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <div>
                                    <p className="text-white font-medium">123 Sonic Way</p>
                                    <p className="text-xs">Los Angeles, CA 90028</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-5 border-t border-white/5 flex justify-between items-center">
                            <span className="text-sm text-[#A1A1AA]">Total Paid</span>
                            <span className="font-bold text-lg">$180.00</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="w-full flex flex-col gap-3">
                    <Link
                        href="/bookings"
                        className="w-full py-4 rounded-xl bg-[#A855F7] text-white font-bold hover:bg-[#9333EA] transition-all text-sm text-center flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        View My Bookings
                    </Link>
                    <button
                        className="w-full py-4 rounded-xl bg-[#1A162B] text-white font-bold hover:bg-white/5 transition-all text-sm border border-white/5 flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4 text-[#A855F7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        Message Studio
                    </button>
                    <button
                        className="w-full py-4 rounded-xl bg-[#1A162B] text-white font-bold hover:bg-white/5 transition-all text-sm border border-white/5 flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4 text-[#A1A1AA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Add to Calendar
                    </button>
                </div>
            </div>

            {/* Very simple non-functional copy of BottomNav items as seen in screenshot */}
            <div className="fixed bottom-0 w-full max-w-md bg-[#120F1D] border-t border-white/5 pb-8 pt-3 px-6 flex justify-between text-[#A1A1AA] text-xs">
                <div className="flex flex-col items-center gap-1">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                    <span>Explore</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-[#A855F7]">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    <span>Bookings</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    <span>Messages</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    <span>Profile</span>
                </div>
            </div>

        </div>
    );
}
