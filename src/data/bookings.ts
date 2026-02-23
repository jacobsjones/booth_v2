import { Booking } from "@/types";

export const mockBookings: Booking[] = [
    {
        id: "bkg_1",
        studioId: "neon-beats-sanctuary",
        studioName: "Neon Dreams Audio", // Matching the design screen names
        studioImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
        date: "2024-02-25T14:00:00.000Z", // "Tomorrow, 2:00 PM" relative or absolute Feb 25 2024
        timeStart: "2:00 PM",
        timeEnd: "4:00 PM",
        durationHours: 2,
        totalCost: 180,
        status: "CONFIRMED",
    },
    {
        id: "bkg_2",
        studioId: "vibe-check-studio",
        studioName: "Vibe Central Studios",
        studioImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
        date: "2024-10-26T16:30:00.000Z", // "Sat, Oct 26 • 4:30 PM"
        timeStart: "4:30 PM",
        timeEnd: "6:30 PM",
        durationHours: 2,
        totalCost: 150,
        status: "CONFIRMED",
    },
    {
        id: "bkg_3",
        studioId: "basement-beats",
        studioName: "The Bassment",
        studioImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
        date: "2024-10-30T10:00:00.000Z", // "Wed, Oct 30 • 10:00 AM"
        timeStart: "10:00 AM",
        timeEnd: "2:00 PM",
        durationHours: 4,
        totalCost: 220,
        status: "PENDING",
    }
];

export function getUserBookings(): Booking[] {
    return mockBookings;
}

export function getBookingById(id: string): Booking | undefined {
    return mockBookings.find((b) => b.id === id);
}
