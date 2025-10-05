import axios from "axios";

import type { Item } from "../types/note";

interface FetchItem {
  notes: Item[];
  totalPages: number;
}

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

const API_URL = "https://notehub-public.goit.study/api/notes";
const myKey = import.meta.env.VITE_API_KEY;

const headers = {
  Authorization: `Bearer ${myKey}`,
};

export const noteFetch = async (
  page: number,
  perPage: number,
  text: string
): Promise<FetchItem> => {
  const res = await axios.get<FetchItem>(
    `${API_URL}?search=${text}&page=${page}&perPage=${perPage}&sortBy=created`,
    { headers }
  );

  return res.data;
};

export const noteDelete = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, { headers });
};

export const noteCreate = async ({ title, content, tag }: FormValues) => {
  const newNote = { title, content, tag };

  const res = await axios.post(API_URL, newNote, { headers });
  return res.data;
};
