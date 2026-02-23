"use client";

import { useQuery } from "@tanstack/react-query";
import { Studio } from "@/types";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Footer } from "@/components/Footer";
import { StudioCard } from "@/components/StudioCard";

interface StudioDetailClientProps {
    id: string;
}

export default function StudioDetailClient({ id }: StudioDetailClientProps) {

    const { data: studio, isLoading } = useQuery({
        queryKey: ["studio", id],
        queryFn: async () => {
            const res = await fetch(`/api/studios/${id}`);
            if (!res.ok) throw new Error("Studio not found");
            return res.json() as Promise<Studio>;
        },
    });

    const { data: allStudios } = useQuery({
        queryKey: ["studios"],
        queryFn: async () => {
            const res = await fetch("/api/studios");
            return res.json() as Promise<{ studios: Studio[]; total: number }>;
        },
    });

    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [guests, setGuests] = useState(1);
    const [timeSlot, setTimeSlot] = useState<string | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const bookingSectionRef = useRef<HTMLDivElement>(null);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted text-sm">Loading studio...</p>
                </div>
            </div>
        );
    }

    if (!studio) {
        return (
            <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4">
                <div className="text-6xl mb-2">🎙️</div>
                <h1 className="text-2xl font-bold">Studio Not Found</h1>
                <p className="text-muted">The studio you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/search" className="mt-4 px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-600 transition-colors">
                    Browse Studios
                </Link>
            </div>
        );
    }

    const hours = timeSlot ? 4 : 0;
    const basePrice = studio.pricePerHour * hours;
    const serviceFee = Math.round(basePrice * 0.15);
    const totalPrice = basePrice + serviceFee;
    const canBook = checkIn && timeSlot && guests > 0;

    const similarStudios = allStudios?.studios.filter((s) => s.id !== studio.id).slice(0, 2) || [];

    const timeSlots = [
        { label: "Morning", value: "morning", time: "9AM - 1PM" },
        { label: "Afternoon", value: "afternoon", time: "1PM - 5PM" },
        { label: "Evening", value: "evening", time: "5PM - 9PM" },
    ];

    return (
        <>
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
                    <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <Image src={studio.images[lightboxIndex]} alt={studio.name} width={1200} height={800} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted">{lightboxIndex + 1} / {studio.images.length}</div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <nav className="flex items-center gap-2 text-sm text-muted mb-4">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/search" className="hover:text-white transition-colors">Studios</Link>
                    <span>/</span>
                    <span className="text-white">{studio.name}</span>
                </nav>

                <div className="rounded-2xl overflow-hidden mb-8">
                    <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="aspect-[16/7] sm:aspect-[16/6]">
                        {studio.images.map((img, i) => (
                            <SwiperSlide key={i}>
                                <div className="relative w-full h-full cursor-pointer" onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}>
                                    <Image src={img} alt={`${studio.name} - ${i + 1}`} fill className="object-cover" sizes="100vw" priority={i === 0} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{studio.name}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-1.5 underline-offset-4 decoration-accent/30">
                                    <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                    <span className="font-semibold">{studio.rating}</span>
                                    <span className="text-muted">({studio.reviewCount} reviews)</span>
                                </div>
                                <span className="text-muted">•</span>
                                <span className="text-muted">{studio.location.area}, {studio.location.city}</span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-6">
                                {[{ label: "Price", value: `£${studio.pricePerHour}/hr`, icon: "💷" },
                                { label: "Space", value: `${studio.sqft.toLocaleString()}ft²`, icon: "📐" },
                                { label: "Hours", value: studio.hours, icon: "🕐" }].map((stat) => (
                                    <div key={stat.label} className="p-4 rounded-xl bg-card border border-surface-50/30">
                                        <span className="text-xl">{stat.icon}</span>
                                        <p className="text-xs text-muted mt-2">{stat.label}</p>
                                        <p className="font-semibold text-sm mt-0.5">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold mb-4">About the Space</h2>
                            <p className="text-muted-foreground leading-relaxed">{studio.description}</p>
                            <div className="flex flex-wrap gap-2 mt-5">
                                {studio.amenities.map((amenity) => (
                                    <span key={amenity} className="px-3 py-1.5 rounded-lg bg-card border border-surface-50/30 text-xs font-medium text-muted-foreground">{amenity}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold mb-4">The Technical Gear</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {studio.equipment.map((item) => (
                                    <div key={item.name} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-surface-50/30 hover:border-accent/20 transition-colors group">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-xl group-hover:bg-accent/20 transition-colors">{item.icon}</div>
                                        <div>
                                            <p className="text-xs text-muted uppercase tracking-wider">{item.category}</p>
                                            <p className="font-semibold text-sm mt-0.5">{item.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold">Reviews & Analytics</h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold">{studio.rating}</span>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} className={`w-4 h-4 ${star <= Math.round(studio.rating) ? "text-yellow-400 fill-yellow-400" : "text-surface-50"}`} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {[{ label: "Acoustics", value: 4.9 }, { label: "Vibe", value: 5.0 }, { label: "Equipment", value: 4.8 }, { label: "Value", value: 4.7 }].map((cat) => (
                                    <div key={cat.label} className="flex items-center gap-3">
                                        <span className="text-sm text-muted w-20">{cat.label}</span>
                                        <div className="flex-1 h-1.5 bg-surface-50 rounded-full overflow-hidden">
                                            <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${(cat.value / 5) * 100}%` }} />
                                        </div>
                                        <span className="text-xs font-medium w-10 text-right">{cat.value}/5.0</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-4">
                                {(showAllReviews ? studio.reviews : studio.reviews.slice(0, 2)).map((review) => (
                                    <div key={review.id} className="p-4 rounded-xl bg-card border border-surface-50/30">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-semibold">{review.avatar}</div>
                                            <div>
                                                <p className="font-medium text-sm">{review.author}</p>
                                                <p className="text-xs text-muted">{review.date}</p>
                                            </div>
                                            <div className="ml-auto flex items-center gap-1">
                                                <svg className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                                <span className="text-xs font-medium">{review.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
                                    </div>
                                ))}
                            </div>
                            {studio.reviews.length > 2 && (
                                <button onClick={() => setShowAllReviews(!showAllReviews)} className="mt-4 w-full py-3 rounded-xl border border-surface-50/50 text-sm font-medium hover:bg-card transition-colors">
                                    {showAllReviews ? "Show Less" : `Show All ${studio.reviews.length} Reviews`}
                                </button>
                            )}
                        </div>

                        {similarStudios.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold mb-4">Similar Studios</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {similarStudios.map((s) => (<StudioCard key={s.id} studio={s} />))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1" ref={bookingSectionRef}>
                        <div className="sticky top-24">
                            <div className="rounded-2xl bg-card border border-surface-50/30 p-6 shadow-card">
                                <div className="flex items-baseline justify-between mb-6">
                                    <div><span className="text-2xl font-bold">£{studio.pricePerHour}</span><span className="text-muted text-sm"> / hour</span></div>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                        <span className="text-sm font-medium">{studio.rating}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-5">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs text-muted mb-1.5 font-medium uppercase tracking-wider">Check In</label>
                                            <DatePicker selected={checkIn} onChange={(date: Date | null) => setCheckIn(date)} placeholderText="Select date" minDate={new Date()} className="w-full px-3 py-2.5 rounded-lg bg-surface border border-surface-50/50 text-sm outline-none focus:border-accent transition-colors" dateFormat="dd MMM yyyy" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-muted mb-1.5 font-medium uppercase tracking-wider">Check Out</label>
                                            <DatePicker selected={checkOut} onChange={(date: Date | null) => setCheckOut(date)} placeholderText="Select date" minDate={checkIn || new Date()} className="w-full px-3 py-2.5 rounded-lg bg-surface border border-surface-50/50 text-sm outline-none focus:border-accent transition-colors" dateFormat="dd MMM yyyy" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-muted mb-1.5 font-medium uppercase tracking-wider">Artists</label>
                                        <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} className="w-full px-3 py-2.5 rounded-lg bg-surface border border-surface-50/50 text-sm outline-none focus:border-accent transition-colors appearance-none cursor-pointer">
                                            {[...Array(10)].map((_, i) => (<option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? "artist" : "artists"}</option>))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label className="block text-xs text-muted mb-2 font-medium uppercase tracking-wider">Session Time</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {timeSlots.map((slot) => (
                                            <button key={slot.value} onClick={() => setTimeSlot(timeSlot === slot.value ? null : slot.value)} className={`p-3 rounded-xl text-center transition-all ${timeSlot === slot.value ? "bg-accent text-white ring-2 ring-accent/50" : "bg-surface border border-surface-50/50 hover:border-accent/30"}`}>
                                                <p className="text-xs font-semibold">{slot.label}</p>
                                                <p className={`text-[10px] mt-0.5 ${timeSlot === slot.value ? "text-white/70" : "text-muted"}`}>{slot.time}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {canBook && (
                                    <div className="space-y-2 mb-5 py-4 border-t border-surface-50/30">
                                        <div className="flex justify-between text-sm"><span className="text-muted">£{studio.pricePerHour} × {hours} hours</span><span>£{basePrice}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-muted">Service fee (15%)</span><span>£{serviceFee}</span></div>
                                        <div className="flex justify-between font-bold text-base pt-2 border-t border-surface-50/30"><span>Total</span><span className="text-accent">£{totalPrice}<span className="text-muted font-normal text-xs"> / {hours}hrs</span></span></div>
                                    </div>
                                )}

                                <Link href={`/studios/${studio.id}/book`} className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center ${canBook ? "bg-gradient-accent text-white hover:opacity-90 hover:shadow-glow active:scale-[0.98]" : "bg-gradient-accent text-white hover:opacity-90 hover:shadow-glow active:scale-[0.98]"}`}>
                                    Book Session
                                </Link>
                                <p className="text-center text-xs text-muted mt-3">You won&apos;t be charged yet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16"><Footer /></div>
        </>
    );
}
