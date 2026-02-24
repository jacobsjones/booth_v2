"use client";

import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { getSavedStudios } from "@/data/savedStudios";
import { SavedStudioCard } from "@/components/SavedStudioCard";
import { useState } from "react";

export default function SavedStudiosPage() {
    const studios = getSavedStudios();
    const [activeTab, setActiveTab] = useState("All Saved");
    const tabs = ["All Saved", "Available Now", "Top Rated"];

    return (
        <div className="min-h-screen bg-[#120F1D] pb-32">
            {/* Header */}
            <header className="px-4 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-[#120F1D] z-40">
                <div className="flex items-center gap-4">
                    <Link href="/" className="w-8 h-8 rounded-full flex items-center justify-center text-[#A855F7] hover:bg-white/5 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </Link>
                    <h1 className="text-xl font-bold text-white tracking-wide">Saved Studios</h1>
                </div>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#A855F7] hover:bg-white/5 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="21" x2="4" y2="14" />
                        <line x1="4" y1="10" x2="4" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12" y2="3" />
                        <line x1="20" y1="21" x2="20" y2="16" />
                        <line x1="20" y1="12" x2="20" y2="3" />
                        <line x1="1" y1="14" x2="7" y2="14" />
                        <line x1="9" y1="8" x2="15" y2="8" />
                        <line x1="17" y1="16" x2="23" y2="16" />
                    </svg>
                </button>
            </header>

            <main>
                {/* Filter Tabs */}
                <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${activeTab === tab
                                    ? "bg-[#A855F7] text-white border-[#A855F7] shadow-[0_0_15px_-3px_#A855F7]"
                                    : "bg-[#1A162B] text-[#A1A1AA] border-white/5"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="px-4 grid grid-cols-2 gap-x-4 gap-y-6">
                    {studios.map((studio) => (
                        <SavedStudioCard key={studio.id} studio={studio} />
                    ))}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
