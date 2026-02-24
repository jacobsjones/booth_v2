"use client";

import Link from "next/link";
import Image from "next/image";
import { BottomNav } from "@/components/BottomNav";
import { getUserProfile } from "@/data/user";
import { useState } from "react";

export default function ProfilePage() {
    const profile = getUserProfile();
    const [pushEnabled, setPushEnabled] = useState(profile.settings.pushNotifications);
    const [emailEnabled, setEmailEnabled] = useState(profile.settings.emailUpdates);

    return (
        <div className="min-h-screen bg-[#120F1D] pb-32">
            {/* Header */}
            <header className="px-4 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-[#120F1D] z-40">
                <Link href="/" className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/5 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                </Link>
                <h1 className="text-lg font-bold text-white tracking-wide">Profile</h1>
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/5 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                    </svg>
                </button>
            </header>

            <main className="px-5">
                {/* User Info */}
                <div className="flex flex-col items-center mt-2 mb-8">
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#22D3EE] via-[#A855F7] to-[#A855F7]">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#120F1D]">
                                <Image
                                    src={profile.avatar}
                                    alt={profile.name}
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        {/* Online Indicator */}
                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#22D3EE] border-[3px] border-[#120F1D] rounded-full" />
                    </div>

                    <h2 className="text-xl font-bold text-white tracking-wide mb-1">{profile.name}</h2>
                    <p className="text-[#A855F7] text-xs font-medium tracking-wide mb-5">{profile.email}</p>

                    <button className="px-6 py-2.5 rounded-full border border-white/10 text-white font-bold text-xs tracking-wider active:scale-95 transition-all">
                        Edit Profile
                    </button>
                </div>

                {/* Stats */}
                <div className="flex gap-3 mb-8">
                    <div className="flex-1 bg-[#1A162B]/60 border border-white/5 rounded-2xl py-4 flex flex-col items-center justify-center">
                        <span className="text-white font-bold text-xl mb-1">{profile.stats.bookings}</span>
                        <span className="text-[#A1A1AA] text-[10px] font-bold tracking-widest uppercase">Bookings</span>
                    </div>
                    <div className="flex-1 bg-[#1A162B]/60 border border-white/5 rounded-2xl py-4 flex flex-col items-center justify-center">
                        <span className="text-white font-bold text-xl mb-1">{profile.stats.saved}</span>
                        <span className="text-[#A1A1AA] text-[10px] font-bold tracking-widest uppercase">Saved</span>
                    </div>
                    <div className="flex-1 bg-[#1A162B]/60 border border-white/5 rounded-2xl py-4 flex flex-col items-center justify-center">
                        <span className="text-white font-bold text-xl mb-1">{profile.stats.reviews}</span>
                        <span className="text-[#A1A1AA] text-[10px] font-bold tracking-widest uppercase">Reviews</span>
                    </div>
                </div>

                {/* Preferences */}
                <div className="mb-8">
                    <h3 className="text-[#A1A1AA] text-[10px] font-bold tracking-widest uppercase mb-3 px-1">Preferences</h3>
                    <div className="bg-[#1A162B]/80 border border-white/5 rounded-2xl overflow-hidden">

                        <div className="flex items-center justify-between p-4 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                </svg>
                                <span className="text-white text-sm font-bold tracking-wide">Push Notifications</span>
                            </div>
                            {/* Toggle */}
                            <button
                                onClick={() => setPushEnabled(!pushEnabled)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out flex ${pushEnabled ? 'bg-[#22D3EE] justify-end' : 'bg-white/10 justify-start'}`}
                            >
                                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <span className="text-white text-sm font-bold tracking-wide">Email Updates</span>
                            </div>
                            {/* Toggle */}
                            <button
                                onClick={() => setEmailEnabled(!emailEnabled)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out flex ${emailEnabled ? 'bg-[#22D3EE] justify-end' : 'bg-white/10 justify-start'}`}
                            >
                                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                            </button>
                        </div>

                    </div>
                </div>

                {/* Account Settings */}
                <div className="mb-8">
                    <h3 className="text-[#A1A1AA] text-[10px] font-bold tracking-widest uppercase mb-3 px-1">Account Settings</h3>
                    <div className="bg-[#1A162B]/80 border border-white/5 rounded-2xl overflow-hidden">

                        <button className="w-full flex items-center justify-between p-4 border-b border-white/5 active:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3 text-[#A855F7] hover:text-[#C084FC]">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                                    <line x1="2" y1="10" x2="22" y2="10" />
                                </svg>
                                <span className="text-white text-sm font-bold tracking-wide">Payment Methods</span>
                            </div>
                            <svg className="w-4 h-4 text-[#A1A1AA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 border-b border-white/5 active:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3 text-[#A855F7] hover:text-[#C084FC]">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                                <span className="text-white text-sm font-bold tracking-wide">Help & Support</span>
                            </div>
                            <svg className="w-4 h-4 text-[#A1A1AA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 active:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3 text-[#A855F7] hover:text-[#C084FC]">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                                <span className="text-white text-sm font-bold tracking-wide">Terms of Service</span>
                            </div>
                            <svg className="w-4 h-4 text-[#A1A1AA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>

                    </div>
                </div>

                {/* Log Out */}
                <button className="w-full py-4 rounded-xl bg-[#4C1D2A]/30 border border-[#F43F5E]/20 text-[#F43F5E] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#F43F5E]/10 transition-colors active:scale-95 mb-8">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Log Out
                </button>

                {/* Footer Version */}
                <div className="text-center pb-8">
                    <p className="text-[#A1A1AA] text-xs font-medium">App Version 2.4.1 (Build 892)</p>
                    <p className="text-[#A1A1AA]/50 text-[10px] mt-1">© 2024 StudioShare Marketplace Inc.</p>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
