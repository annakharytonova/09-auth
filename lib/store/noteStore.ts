import { create } from "zustand";
import type { CreateNoteParam } from "@/types/note";
import { persist } from "zustand/middleware";

type NoteDraftStore = {
  draft: CreateNoteParam;
  setDraft: (note: CreateNoteParam) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteParam = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
    },
  ),
);
