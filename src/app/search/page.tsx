import { Metadata } from "next";
import SearchClient from "./SearchClient";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Search Studios — Booth",
    description: "Find and book recording studios in London, Manchester, Glasgow and across the UK.",
};

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="h-[calc(100vh-64px)] flex items-center justify-center text-muted">Loading...</div>}>
            <SearchClient />
        </Suspense>
    );
}
