import { cookies } from "next/headers";
import { api } from "./api";
import type { NotesParam } from "./clientApi";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export async function fetchNotes(
  query: string,
  page: number,
  tag?: string,
): Promise<NotesParam> {
  const cookieStore = await cookies();
  const response = await api.get<NotesParam>("/notes", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: { search: query, page, perPage: 12, tag },
  });
  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await api.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const response = await api.get<User>(`/users/me`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const response = await api.get(`/auth/session`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
}
