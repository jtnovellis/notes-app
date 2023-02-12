import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useNotes } from '../context';

export function NoteLayout() {
  const { notesWithTags: notes } = useNotes();
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);

  if (!note) return <Navigate to='/' />;

  return <Outlet context={{ note }} />;
}
