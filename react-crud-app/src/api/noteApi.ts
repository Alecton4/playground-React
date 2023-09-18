import axios from "axios";
import { CreateNoteInput } from "../components/notes/create.note";
import { UpdateteNoteInput as UpdateNoteInput } from "../components/notes/update.note";
import { INote, INoteResponse, INotesResponse } from "./types";

const BASE_URL = "http://localhost:8000/api/";

export const noteApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
noteApi.defaults.headers.common["Content-Type"] = "application/json";

export const createOne = async (note: CreateNoteInput) => {
  const response = await noteApi.post<INoteResponse>("notes/", note);
  return response.data;
};

export const readAll = async (page = 1, limit = 10) => {
  const response = await noteApi.get<INoteResponse>(
    `notes/?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const readOne = async (noteID: string) => {
  const response = await noteApi.get<INoteResponse>(`notes/${noteID}`);
  return response.data;
};

export const updateOne = async (noteID: string, note: UpdateNoteInput) => {
  const response = await noteApi.patch<INoteResponse>(`notes/${noteID}`, note);
  return response.data;
};

export const deleteOne = async (noteId: string) => {
  const response = await noteApi.delete<INoteResponse>(`notes/${noteId}`);
  return response.data;
};
