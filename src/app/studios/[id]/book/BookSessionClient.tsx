"use client";

import { useQuery } from "@tanstack/react-query";
import { Studio } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BookSessionClient({ id }: { id: string }) {
    const { data: studio, isLoading } = useQuery({
        queryKey: ["studio", id],
        queryFn: async () => {
            const res = await fetch(`/api/studios/${id}`);
            if (!res.ok) throw new Error("Studio not found");
            return res.json() as Promise<Studio>;
        },
    });

    // Mocking Date selection (Always October 2023 for design fidelity)
    const [selectedDate, setSelectedDate] = useState(5);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>("10:00 AM - 12:00 PM");

    if (isLoading) {
        return <div className="min-h-screen bg-[#120F1D] flex items-center justify-center" />;
    }

    if (!studio) {
        return <div className="min-h-screen bg-[#120F1D] flex items-center justify-center">Studio Not Found</div>;
    }

    const timeSlots = [
        { label: "10:00 AM - 12:00 PM", status: "active" },     // Selected
        { label: "2:00 PM - 4:00 PM", status: "available" },    // Unselected available (Blue outline)
        { label: "4:00 PM - 6:00 PM", status: "available" },
        { label: "12:00 PM - 2:00 PM", status: "unavailable" }, // Grayed out
        { label: "6:00 PM - 8:00 PM", status: "available" },
        { label: "8:00 PM - 10:00 PM", status: "unavailable" },
    ];

    const hourlyRate = studio.pricePerHour;
    const hours = 2; // Assuming 2hr blocks for this design
    const totalCost = hourlyRate * hours;

    return (
        <div className="min-h-screen bg-[#120F1D] text-white flex flex-col pb-32">

            <header className="px-4 h-16 flex items-center justify-between sticky top-0 bg-[#120F1D] z-10 border-b border-white/5">
                <Link href={`/studios/${id}`} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                    </svg>
                </Link>
                <h1 className="text-sm font-bold tracking-wide">{studio.name}</h1>
                <div className="w-10" />
            </header>

            <main className="p-4 max-w-md mx-auto w-full flex-1">
                {/* Image Banner */}
                <div className="relative h-28 w-full rounded-2xl overflow-hidden mb-8 border border-white/5">
                    <Image
                        src={studio.images[0]}
                        alt={studio.name}
                        fill
                        className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120F1D]/80 to-transparent" />

                    <div className="absolute bottom-3 left-4 text-[10px] font-bold tracking-[0.2em] text-[#A855F7] uppercase">
                        Premium Studio
                    </div>
                </div>

                {/* Date Selection */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Select Date</h2>
                        <span className="text-[#3B82F6] text-sm font-medium">October 2023</span>
                    </div>

                    <div className="bg-[#1A162B] border border-white/5 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-4 text-[#A1A1AA]">
                            <button className="w-6 h-6 flex items-center justify-center">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                            </button>
                            <span className="text-xs font-bold text-white tracking-widest uppercase">October 2023</span>
                            <button className="w-6 h-6 flex items-center justify-center">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-y-4 text-center">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                                <div key={d} className="text-[10px] font-bold text-[#A1A1AA]">{d}</div>
                            ))}

                            {/* Previous Month */}
                            <div className="text-sm font-medium text-[#A1A1AA]/30">28</div>
                            <div className="text-sm font-medium text-[#A1A1AA]/30">29</div>
                            <div className="text-sm font-medium text-[#A1A1AA]/30">30</div>

                            {/* Current Month */}
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((day) => (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(day)}
                                    className={`text-sm font-bold w-8 h-8 mx-auto rounded-full flex items-center justify-center ${selectedDate === day
                                            ? "bg-[#A855F7] text-white shadow-[0_0_15px_-3px_#A855F7]"
                                            : "text-white"
                                        }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Time Slots */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Available Time Slots</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((slot) => {
                            const isSelected = selectedTimeSlot === slot.label;

                            let buttonClass = "py-3.5 px-2 rounded-full text-xs font-bold text-center border transition-all truncate";

                            if (isSelected) {
                                // Active State (Green text according to design? Actually design shows left column green, top right blue. Let's make the selected one blue)
                                buttonClass += " border-[#3B82F6] text-[#3B82F6] bg-[#3B82F6]/10 shadow-[0_0_15px_-5px_#3B82F6]";
                            } else if (slot.status === "unavailable") {
                                buttonClass += " border-white/5 text-[#A1A1AA]/40 cursor-not-allowed bg-[#1A162B]/50";
                            } else if (slot.label === "10:00 AM - 12:00 PM" || slot.label.includes("PM - 6") || slot.label.includes("PM - 8")) {
                                // Green outlines from design
                                buttonClass += " border-[#10B981] text-[#10B981] bg-[#10B981]/5 hover:bg-[#10B981]/10";
                            } else {
                                // Default available
                                buttonClass += " border-white/10 text-white hover:bg-white/5";
                            }

                            return (
                                <button
                                    key={slot.label}
                                    disabled={slot.status === "unavailable"}
                                    onClick={() => setSelectedTimeSlot(slot.label)}
                                    className={buttonClass}
                                >
                                    {slot.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 w-full left-0 bg-[#120F1D] border-t border-white/5 p-4 z-40">
                <div className="max-w-md mx-auto">
                    <div className="flex justify-between items-end mb-4 pr-1">
                        <div>
                            <p className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase mb-1">Total Cost</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-[#3B82F6] text-xl font-bold">${totalCost}</span>
                                <span className="text-[#A1A1AA] text-xs">(${hourlyRate}/hr × {hours} hrs)</span>
                            </div>
                        </div>
                        <div className="flex -space-x-2">
                            {/* Avatars */}
                            <div className="w-6 h-6 rounded-full bg-white border border-[#120F1D] overflow-hidden">
                                <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" alt="User 1" width={24} height={24} />
                            </div>
                            <div className="w-6 h-6 rounded-full bg-white border border-[#120F1D] overflow-hidden">
                                <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" alt="User 2" width={24} height={24} />
                            </div>
                        </div>
                    </div>

                    <Link
                        href={`/booking-success?studioId=${id}`}
                        className={`w-full h-14 rounded-2xl flex items-center justify-center font-bold text-white transition-all ${selectedTimeSlot ? "bg-[#3B82F6] hover:bg-[#2563EB] shadow-[0_0_20px_-5px_#3B82F6]" : "bg-white/10 text-white/50 cursor-not-allowed pointer-events-none"}`}
                    >
                        Continue to Payment
                    </Link>
                </div>
            </div>

        </div>
    );
}
