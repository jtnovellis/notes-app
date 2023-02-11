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
  return (
    <NoteContext.Provider value={{ notesWithTags, onCreateNote }}>{children}</NoteContext.Provider>
  );
}
