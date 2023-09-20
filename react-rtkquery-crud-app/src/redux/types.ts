// !!! The field names here must be the same as in the backend.
export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
export type MutateNote = {
  title: string;
  content: string;
};

export type GenericResponse = {
  status: string;
  message: string;
};

export type SingleNoteResponse = {
  status: string;
  note: Note;
};

export type NotesResponse = {
  status: string;
  results: number;
  notes: Note[];
};
