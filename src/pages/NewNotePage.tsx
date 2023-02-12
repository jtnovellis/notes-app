import { NoteFrom } from '../components/NoteForm';

export function NewNotePage() {
  return (
    <section>
      <h1 className='text-4xl font-bold text-gray-600 mb-4'>New Note</h1>
      <NoteFrom />
    </section>
  );
}
