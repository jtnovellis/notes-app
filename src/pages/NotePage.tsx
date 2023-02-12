import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { TagItem } from '../components/TagItem';
import { Note } from '../types';
import ReactMarkdowm from 'react-markdown';
import { useNotes } from '../context';

export function NotePage() {
  const { note } = useOutletContext<{ note: Note }>();
  const { onDeleteNote } = useNotes();
  const navigate = useNavigate();

  const hasTags = note.tags.length > 0;

  function handleClick() {
    onDeleteNote(note.id);
    navigate('..');
  }

  return (
    <section>
      <div className='flex justify-between mb-4'>
        <h1 className='text-4xl text-gray-600 font-bold'>{note.title}</h1>
        <div className='flex gap-3'>
          <Link
            to={`/${note.id}/edit`}
            className='bg-purple-500 hover:bg-purple-400 px-7 py-2 rounded-lg font-bold text-white'
          >
            Edit
          </Link>
          <button
            onClick={handleClick}
            className='border border-red-500 text-red-500 px-5 py-2 rounded-lg'
          >
            Delete
          </button>
          <Link to='..' className='border border-gray-400 rounded-lg px-5 py-2 text-gray-400'>
            Back
          </Link>
        </div>
      </div>
      <p>Tags:</p>
      <div className='flex flex-wrap gap-3 mb-10'>
        {hasTags ? note.tags.map((tag) => <TagItem key={tag.id} {...tag} />) : <p>No Tags</p>}
      </div>
      <ReactMarkdowm>{note.body}</ReactMarkdowm>
    </section>
  );
}
