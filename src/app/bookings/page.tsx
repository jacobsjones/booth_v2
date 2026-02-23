"use client";

import { BottomNav } from "@/components/BottomNav"; import { getUserBookings } from "@/data/bookings";
import { Booking } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";

export default function BookingsPage() {
    const bookings = getUserBookings();

    return (
        <div className="min-h-screen bg-surface pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-surface-50/10">
                <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
                    <Link href="/" className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-muted hover:bg-surface-50/50 hover:text-white transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </Link>
                    <h1 className="text-sm font-semibold tracking-wide">My Bookings</h1>
                    <div className="w-10" />
                </div>

                {/* Tabs */}
                <div className="flex px-4 max-w-7xl mx-auto border-b border-surface-50/10">
                    <button className="flex-1 pb-3 text-sm font-semibold text-accent border-b-2 border-accent">
                        Upcoming
                    </button>
                    <button className="flex-1 pb-3 text-sm font-medium text-muted hover:text-white transition-colors">
                        Past
                    </button>
                </div>
            </header>

            {/* List */}
            <main className="p-4 space-y-4 max-w-lg mx-auto mt-2">
                {bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
            </main>

            <BottomNav />
        </div>
    );
}

function BookingCard({ booking }: { booking: Booking }) {
    // Custom date formatting to match "Tomorrow, 2:00 PM" or "Sat, Oct 26 • 4:30 PM"
    const dateObj = parseISO(booking.date);

    // MOCK formatting logic
    let displayDate = "";
    if (booking.id === "bkg_1") displayDate = "Tomorrow, 2:00 PM";
    else if (booking.id === "bkg_2") displayDate = "Sat, Oct 26 • 4:30 PM";
    else if (booking.id === "bkg_3") displayDate = "Wed, Oct 30 • 10:00 AM";
    else displayDate = format(dateObj, "EEE, MMM d • h:mm a");

    return (
        <div className="bg-[#120F1D] border border-surface-50/30 rounded-2xl overflow-hidden shadow-lg group relative">
            <Link href={`/studios/${booking.studioId}`} className="absolute inset-0 z-10">
                <span className="sr-only">View booking details for {booking.studioName}</span>
            </Link>

            <div className="relative aspect-[21/9]">
                <Image
                    src={booking.studioImage}
                    alt={booking.studioName}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-500"
                />

                {/* Status Badge overlays the image */}
                <div className="absolute top-3 left-3 z-20">
                    {booking.status === "CONFIRMED" ? (
                        <div className="px-2.5 py-1 bg-[#14B8A6] rounded text-[10px] font-bold tracking-wider text-black">
                            CONFIRMED
                        </div>
                    ) : (
                        <div className="px-2.5 py-1 bg-[#D97706] rounded text-[10px] font-bold tracking-wider text-white">
                            PENDING
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-bold">{booking.studioName}</h3>

                <div className="flex items-center text-xs text-[#A1A1AA] mt-1 mb-4">
                    <svg className="w-3.5 h-3.5 mr-1.5 text-[#A855F7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{displayDate}</span>
                </div>

                <div className="relative z-20 flex gap-2">
                    {booking.status === "CONFIRMED" ? (
                        <>
                            <a
                                href="#"
                                className="flex-1 h-10 rounded-xl bg-[#1A162B] border border-white/5 text-xs font-semibold hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-white"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <svg className="w-3.5 h-3.5 text-[#22D3EE]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 3L3 10.53V11.5L9.84 14.16L12.5 21H13.46L21 3Z" />
                                </svg>
                                Get Directions
                            </a>
                            <button
                                className="w-10 h-10 shrink-0 rounded-xl bg-[#1A162B] border border-white/5 flex items-center justify-center hover:bg-white/5 transition-colors text-muted"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                    <circle cx="19" cy="12" r="1.5" fill="currentColor" />
                                    <circle cx="5" cy="12" r="1.5" fill="currentColor" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <div className="w-full h-10 rounded-xl bg-[#1A162B] border border-white/5 text-xs font-semibold text-[#A1A1AA] flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="9" strokeDasharray="4 4" className="animate-spin-slow opacity-50" />
                                <path d="M12 7v5l3 3" />
                            </svg>
                            Awaiting Confirmation
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
