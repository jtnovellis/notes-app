import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { NoteData, RawNote, Tag } from '../types';
import { v4 as uuidv4 } from 'uuid';

type NoteContextType = {
  notesWithTags: {
    tags: Tag[];
    id: string;
    title: string;
    body: string;
    tagIds: string[];
  }[];
  onCreateNote: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  tags: Tag[];
  onUpdateNote: (id: string, data: NoteData) => void;
  onDeleteNote: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

export const NoteContext = createContext<NoteContextType | null>(null);

export function useNotes() {
  const data = useContext(NoteContext);
  if (!data) {
    throw new Error('has to be used within <NoteContext.Provider>');
  }
  return data;
}

type NoteProviderProps = {
  children: React.ReactNode;
};

export function NoteProvider({ children }: NoteProviderProps) {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id)) };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prev) => {
      return [...prev, { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) }];
    });
  }

  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function onDeleteNote(id: string) {
    setNotes((prev) => {
      return prev.filter((note) => note.id !== id);
    });
  }

  function onUpdateTag(id: string, label: string) {
    setTags((prev) => {
      return prev.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prev) => {
      return prev.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteTag(id: string) {
    setTags((prev) => {
      return prev.filter((tag) => tag.id !== id);
    });
  }

  return (
    <NoteContext.Provider
      value={{
        onDeleteTag,
        onUpdateNote,
        onDeleteNote,
        notesWithTags,
        onCreateNote,
        onAddTag,
        tags,
        onUpdateTag,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
