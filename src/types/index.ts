export interface Studio {
    id: string;
    name: string;
    tagline: string;
    description: string;
    location: {
        city: string;
        area: string;
        address: string;
        lat: number;
        lng: number;
    };
    pricePerHour: number;
    rating: number;
    reviewCount: number;
    sqft: number;
    hours: string;
    images: string[];
    equipment: EquipmentItem[];
    reviews: Review[];
    amenities: string[];
    featured: boolean;
    popular: boolean;
}

export interface EquipmentItem {
    category: string;
    name: string;
    icon: string;
}

export interface Review {
    id: string;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
}

export interface SearchFilters {
    location?: string;
    priceMin?: number;
    priceMax?: number;
    rating?: number;
    category?: string;
}

export interface BookingState {
    checkIn: Date | null;
    checkOut: Date | null;
    guests: number;
    timeSlot: "morning" | "afternoon" | "evening" | null;
    hours: number;
}
