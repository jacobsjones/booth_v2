import { NextResponse } from "next/server";
import { studios, searchStudios } from "@/data/studios";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || undefined;
    const category = searchParams.get("category") || undefined;
    const priceMax = searchParams.get("priceMax")
        ? parseInt(searchParams.get("priceMax")!)
        : undefined;
    const rating = searchParams.get("rating")
        ? parseFloat(searchParams.get("rating")!)
        : undefined;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const results = query || category || priceMax || rating
        ? searchStudios(query, { category, priceMax, rating })
        : studios;

    return NextResponse.json({
        studios: results,
        total: results.length,
    });
}
