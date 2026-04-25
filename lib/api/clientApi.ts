import type { Note, CreateNoteParam } from "@/types/note";
import type { User } from "@/types/user";

import { api } from "@/lib/api/api";

export interface NotesParam {
  notes: Note[];
  totalPages: number;
}

interface AuthRequest {
  email: string;
  password: string;
}

export async function fetchNotes(
  query: string,
  page: number,
  tag?: string,
): Promise<NotesParam> {
  const optionsNote = {
    params: {
      search: query,
      page,
      perPage: 12,
      tag,
    },
  };
  const response = await api.get<NotesParam>("/notes", optionsNote);
  return response.data;
}

export async function createNote(newNote: CreateNoteParam): Promise<Note> {
  const response = await api.post<Note>("/notes", newNote);
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function register(data: AuthRequest) {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
}

export async function login(data: AuthRequest) {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
}

export async function logout() {
  await api.post<User>("/auth/logout");
}

export async function checkSession() {
  const response = await api.get<User>("/auth/session");
  return response.data;
}

export async function getMe() {
  const response = await api.get<User>("/users/me");
  return response.data;
}

export async function updateMe(data: { username: string }) {
  const response = await api.patch<User>("/users/me", data);
  return response.data;
}
