import { studios } from "@/data/studios";
import { Metadata } from "next";
import StudioDetailClient from "./StudioDetailClient";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const studio = studios.find((s) => s.id === params.id);
    if (!studio) return { title: "Studio Not Found — Booth" };

    return {
        title: `${studio.name} — Booth`,
        description: studio.description,
        openGraph: {
            images: [studio.images[0]],
        },
    };
}

export default function StudioDetailPage({ params }: { params: { id: string } }) {
    return <StudioDetailClient id={params.id} />;
}
