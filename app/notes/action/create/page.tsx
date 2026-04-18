import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub - Create Note",
  description: "Create your new note",
  openGraph: {
    title: "NoteHub - Create Note",
    description: "Create your new note",
    url: `https://notehub.vercel.app/notes/action/create/`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1042,
        height: 695,
        alt: `NoteHub - Create Note`,
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
