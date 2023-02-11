import { NoteFrom } from '../components/NoteForm';

interface NewNotePageProps {}
export function NewNotePage({}: NewNotePageProps) {
  return (
    <section>
      <h1 className='text-4xl font-bold text-gray-600 mb-4'>New Note</h1>
      <NoteFrom />
    </section>
  );
}
