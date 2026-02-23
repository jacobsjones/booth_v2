import BookSessionClient from "./BookSessionClient";

export default function BookSessionPage({ params }: { params: { id: string } }) {
    return <BookSessionClient id={params.id} />;
}
