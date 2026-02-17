import { NextResponse } from "next/server";
import { getStudioById } from "@/data/studios";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const studio = getStudioById(params.id);

    if (!studio) {
        return NextResponse.json(
            { error: "Studio not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(studio);
}
