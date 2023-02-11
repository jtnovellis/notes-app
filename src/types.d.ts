export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
};

export type NoteData = {
  title: string;
  body: string;
  tags: Tag[];
};

export type RawNoteData = {
  title: string;
  body: string;
  tagIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};
