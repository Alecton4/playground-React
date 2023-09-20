import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import NProgress from "nprogress";

import { MutateNote, Note, NoteResponse } from "./types";

const BASE_URL = "http://localhost:8000/api/notes";

export const noteAPI = createApi({
  reducerPath: "noteAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    createOneNote: builder.mutation<NoteResponse, MutateNote>({
      query(note) {
        return {
          url: "",
          method: "POST",
          credentials: "include",
          body: note,
        };
      },
      invalidatesTags: [{ type: "Notes", id: "LIST" }],
      transformResponse: (result: { note: NoteResponse }) => result.note,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),

    updateOneNote: builder.mutation<
      NoteResponse,
      { noteId: string; noteUpdate: MutateNote }
    >({
      query({ noteId, noteUpdate }) {
        return {
          url: `/${noteId}`,
          method: "PATCH",
          credentials: "include",
          body: noteUpdate,
        };
      },
      invalidatesTags: (result, error, { noteId }) =>
        result
          ? [
              { type: "Notes", id: noteId },
              { type: "Notes", id: "LIST" },
            ]
          : [{ type: "Notes", id: "LIST" }],
      transformResponse: (response: { note: NoteResponse }) => response.note,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),

    getOneNote: builder.query<NoteResponse, string>({
      query(noteId) {
        return {
          url: `/${noteId}`,
          credentials: "include",
        };
      },
      providesTags: (result, error, noteId) => [{ type: "Notes", id: noteId }],
    }),

    getAllNotes: builder.query<Note[], { page: number; limit: number }>({
      query({ page, limit }) {
        return {
          url: `?page=${page}&limit=${limit}`,
          credentials: "include",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id: noteId }) => ({
                type: "Notes" as const,
                id: noteId,
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

    deleteOneNote: builder.mutation<NoteResponse, string>({
      query(noteId) {
        return {
          url: `/${noteId}`,
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
