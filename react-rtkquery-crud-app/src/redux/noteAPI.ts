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
      { id: string; note: MutateNote }
    >({
      query({ id, note }) {
        return {
          url: `/${id}`,
          method: "PATCH",
          credentials: "include",
          body: note,
        };
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Notes", id },
              { type: "Notes", id: "LIST" },
            ]
          : [{ type: "Notes", id: "LIST" }],
      transformResponse: (response: { note: NoteResponse }) => response.note,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),

    getOneNote: builder.query<NoteResponse, string>({
      query(id) {
        return {
          url: `/${id}`,
          credentials: "include",
        };
      },
      providesTags: (result, error, id) => [{ type: "Notes", id }],
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
              ...result.map(({ id: id }) => ({
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

    deleteOneNote: builder.mutation<NoteResponse, string>({
      query(id) {
        return {
          url: `/${id}`,
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
