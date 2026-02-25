import axios from "axios";
import type { Note, NoteType } from "../type/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPage: number;
}

interface Pageination {
    page: number;
    perPage: number;
    search?: string;
}

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: { Authorization: `Bearer ${token}` },
});

export default async function fetchNotes(params: Pageination): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>("/notes",{params});
  
  return data;
}

export const deleteNote = async (id: string) => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

interface PostNotes {
    title: string;
    content: string;
    tag: NoteType;
}

export const createNote = async (taskData: PostNotes) => {
    const { data } = await api.post<Note>(`/notes/`, taskData);
  return data;

}