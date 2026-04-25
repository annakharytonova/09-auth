"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import css from "./NotesPage.module.css";
import Link from "next/link";

interface NotesClientProps {
  tag: string | undefined;
}

function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
    placeholderData: keepPreviousData,
  });
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            handlePageChange={({ selected }) => setPage(selected + 1)}
          />
        )}
        <div>
          <Link href="/notes/action/create" className={css.button}>
            Create note
          </Link>
        </div>
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default NotesClient;
