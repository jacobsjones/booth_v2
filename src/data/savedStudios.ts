import { Studio } from "@/types";

export const mockSavedStudios: Studio[] = [
    {
        id: "sv_neon_sound_labs",
        name: "Neon Sound Labs",
        tagline: "Top tier recording",
        description: "A great place for recording in East London.",
        location: {
            city: "London",
            area: "East London",
            address: "123 Neon Way",
            lat: 51.52,
            lng: -0.07,
        },
        pricePerHour: 85, // Represents the $85 - $130/hr range
        rating: 4.9,
        reviewCount: 120,
        sqft: 800,
        hours: "24/7",
        images: ["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"],
        equipment: [],
        reviews: [],
        amenities: [],
        featured: false,
        popular: false,
    },
    {
        id: "sv_echo_chamber",
        name: "The Echo Chamber",
        tagline: "Acoustically perfect",
        description: "Perfect sound isolation in Shoreditch.",
        location: {
            city: "London",
            area: "Shoreditch",
            address: "45 Echo St",
            lat: 51.52,
            lng: -0.08,
        },
        pricePerHour: 60, // Represents $60 - $100/hr
        rating: 4.7,
        reviewCount: 85,
        sqft: 600,
        hours: "24/7",
        images: ["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"], // Placeholder, will update later if needed
        equipment: [],
        reviews: [],
        amenities: [],
        featured: false,
        popular: false,
    },
    {
        id: "sv_master_mix_hub",
        name: "Master Mix Hub",
        tagline: "Pro mixing environment",
        description: "High-end mixing and mastering in Brixton.",
        location: {
            city: "London",
            area: "Brixton",
            address: "78 Mix Rd",
            lat: 51.46,
            lng: -0.11,
        },
        pricePerHour: 120, // Represents $120 - $250/hr
        rating: 5.0,
        reviewCount: 200,
        sqft: 1200,
        hours: "24/7",
        images: ["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"],
        equipment: [],
        reviews: [],
        amenities: [],
        featured: false,
        popular: false,
    },
    {
        id: "sv_vocal_vibe_zone",
        name: "Vocal Vibe Zone",
        tagline: "Perfect for vocalists",
        description: "Intimate vocal recording in Camden.",
        location: {
            city: "London",
            area: "Camden",
            address: "99 Vocal Ave",
            lat: 51.53,
            lng: -0.14,
        },
        pricePerHour: 45, // Represents $45 - $80/hr
        rating: 4.8,
        reviewCount: 95,
        sqft: 400,
        hours: "10AM - 10PM",
        images: ["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"],
        equipment: [],
        reviews: [],
        amenities: [],
        featured: false,
        popular: false,
    },
];

export function getSavedStudios(): Studio[] {
    return mockSavedStudios;
}
