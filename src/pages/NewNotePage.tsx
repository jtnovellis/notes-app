import { NoteFrom } from '../components/NoteForm';
import { NoteData } from '../types';

interface NewNotePageProps {}
export function NewNotePage({}: NewNotePageProps) {
  function onSubmit(data: NoteData) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <section>
      <h1 className='text-4xl font-bold text-gray-600 mb-4'>New Note</h1>
      <NoteFrom onSubmit={onSubmit} />
    </section>
  );
}
