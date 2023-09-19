import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import NProgress from "nprogress";

import { Note, MutateNote, OneNoteResponse } from "./types";

const BASE_URL = "http://localhost:8000/api/";

export const noteAPI = createApi({
  reducerPath: "noteAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    createOneNote: builder.mutation<OneNoteResponse, MutateNote>({
      query(note) {
        return {
          url: "notes",
          method: "POST",
          credentials: "include",
          body: note,
        };
      },
      invalidatesTags: [{ type: "Notes", id: "LIST" }],
      transformResponse: (result: { note: OneNoteResponse }) => result.note,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),
    updateOneNote: builder.mutation<
      OneNoteResponse,
      { noteId: string; note: MutateNote }
    >({
      query({ noteId: id, note }) {
        return {
          url: `notes/${id}`,
          method: "PATCH",
          credentials: "include",
          body: note,
        };
      },
      invalidatesTags: (result, error, { noteId: id }) =>
        result
          ? [
              { type: "Notes", id },
              { type: "Notes", id: "LIST" },
            ]
          : [{ type: "Notes", id: "LIST" }],
      transformResponse: (response: { note: OneNoteResponse }) => response.note,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),
    getOneNote: builder.query<OneNoteResponse, string>({
      query(noteId) {
        return {
          url: `notes/${noteId}`,
          credentials: "include",
        };
      },
      providesTags: (result, error, id) => [{ type: "Notes", id }],
    }),
    getAllNotes: builder.query<Note[], { page: number; limit: number }>({
      query({ page, limit }) {
        return {
          url: `notes?page=${page}&limit=${limit}`,
          credentials: "include",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Notes" as const,
                id,
              })),
              { type: "Notes", id: "LIST" },
            ]
          : [{ type: "Notes", id: "LIST" }],
      transformResponse: (results: { notes: Note[] }) => results.notes,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
      keepUnusedDataFor: 5,
    }),
    deleteOneNote: builder.mutation<OneNoteResponse, string>({
      query(noteId) {
        return {
          url: `notes/${noteId}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Notes", id: "LIST" }],
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),
  }),
});

export const {
  useCreateOneNoteMutation,
  useDeleteOneNoteMutation,
  useUpdateOneNoteMutation,
  useGetAllNotesQuery,
} = noteAPI;
