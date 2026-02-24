import { UserProfile } from "@/types";

export const mockUserProfile: UserProfile = {
    id: "usr_alex123",
    name: "Alex Producer",
    email: "alex.producer@studioshare.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80", // Using a placeholder avatar
    stats: {
        bookings: 12,
        saved: 5,
        reviews: 3,
    },
    settings: {
        pushNotifications: true,
        emailUpdates: false,
    },
};

export function getUserProfile(): UserProfile {
    return mockUserProfile;
}
