import { NoteFrom } from '../components/NoteForm';
import { useNotes } from '../context';
import { NoteData } from '../types';

interface NewNotePageProps {}
export function NewNotePage({}: NewNotePageProps) {
  const { onCreateNote } = useNotes();

  function onSubmit(data: NoteData) {
    onCreateNote(data);
  }

  return (
    <section>
      <h1 className='text-4xl font-bold text-gray-600 mb-4'>New Note</h1>
      <NoteFrom onSubmit={onSubmit} />
    </section>
  );
}
