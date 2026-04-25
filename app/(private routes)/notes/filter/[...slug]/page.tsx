import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";

interface NotesFiltersProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesFiltersProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `NoteHub - ${slug[0]}`,
    description: `All notes tagged with "${slug[0]}"`,
    openGraph: {
      title: `NoteHub - ${slug[0]}`,
      description: `All notes tagged with "${slug[0]}"`,
      url: `https://notehub.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1042,
          height: 695,
          alt: `NoteHub - ${slug[0]}`,
        },
      ],
    },
  };
}

const NotesFilters = async ({ params }: NotesFiltersProps) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesFilters;
