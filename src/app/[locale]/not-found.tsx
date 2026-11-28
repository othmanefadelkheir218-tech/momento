import PageShell from "@/components/ui/PageShell";
import NotFoundMessage from "@/components/sections/NotFound/NotFoundMessage";

// The 404 page. The previous one is kept in ./_v1/not-found.tsx.

export default function NotFound() {
    return (
        <PageShell>
            <NotFoundMessage />
        </PageShell>
    );
}
