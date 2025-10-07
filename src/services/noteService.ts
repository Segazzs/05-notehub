import axios from "axios";

import type { Note, FormValues } from "../types/note";

interface FetchItem {
  notes: Note[];
  totalPages: number;
}

const API_URL = "https://notehub-public.goit.study/api/notes";
const myKey = import.meta.env.VITE_API_KEY;

const headers = {
  Authorization: `Bearer ${myKey}`,
};

export const noteFetch = async (
  page: number,
  text: string
): Promise<FetchItem> => {
  const res = await axios.get<FetchItem>(
    `${API_URL}?search=${text}&page=${page}&perPage=20&sortBy=created`,
    { headers }
  );
  console.log(res);
  return res.data;
};

export const noteDelete = async (id: string): Promise<FormValues> => {
  const res = await axios.delete<FormValues>(`${API_URL}/${id}`, { headers });

  console.log(res.data);

  return res.data;
};

export const noteCreate = async ({
  title,
  content,
  tag,
}: FormValues): Promise<FormValues> => {
  const newNote = { title, content, tag };

  const res = await axios.post<FormValues>(API_URL, newNote, { headers });
  return res.data;
};
