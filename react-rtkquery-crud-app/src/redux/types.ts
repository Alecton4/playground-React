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

export type OneNoteResponse = {
  status: string;
  note: Note;
};

export type SomeNotesResponse = {
  status: string;
  results: number;
  notes: Note[];
};
