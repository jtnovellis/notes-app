import { useOutletContext } from 'react-router-dom';
import { EditFrom } from '../components/EditForm';
import { Note } from '../types';

export function EditPage() {
  const { note } = useOutletContext<{ note: Note }>();

  return (
    <section>
      <h1 className='text-4xl font-bold text-gray-600 mb-4'>Edit Note</h1>
      <EditFrom note={note} />
    </section>
  );
}
