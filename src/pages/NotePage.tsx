import { useOutletContext } from 'react-router-dom';
import { Note } from '../types';

export function NotePage() {
  const { note } = useOutletContext<{ note: Note }>();
  return (
    <div>
      <div>{note.title}</div>
    </div>
  );
}
