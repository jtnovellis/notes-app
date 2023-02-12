import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../context';
import ReactSelect from 'react-select';
import { Tag } from '../types';
import { NoteCard } from '../components/NoteCard';
import { EditTagsModal } from '../components/EditTagsModal';

export function HomePage() {
  const [title, setTitle] = useState('');
  const { notesWithTags: notes, tags: availableTags } = useNotes();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [showModal, setShowModal] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => note.tags.some((noteTag) => noteTag.id === tag.id)))
      );
    });
  }, [title, selectedTags, notes]);

  function handleShow() {
    setShowModal((prev) => !prev);
  }

  return (
    <>
      <section>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-4xl text-gray-600 font-bold'>Notes</h1>
          <div className='flex gap-3'>
            <Link
              to='/new'
              className='bg-purple-500 hover:bg-purple-400 px-7 py-2 rounded-lg font-bold text-white'
              type='submit'
            >
              Create
            </Link>
            <button
              onClick={handleShow}
              className='bg-gray-300 hover:bg-gray-600 px-5 py-2 rounded-lg font-bold text-gray-600 hover:text-white'
            >
              Edit Tags
            </button>
          </div>
        </div>
        <form className='grid grid-cols-2 gap-x-4 items-center mb-10'>
          <div className='flex flex-col'>
            <label htmlFor='title' className='text-gray-600 mb-2'>
              Title
            </label>
            <input
              placeholder='Search a note'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name='title'
              id='title'
              type='text'
              className='border border-gray-400 rounded-md px-3 py-[5.5px]'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='title' className='text-gray-600 mb-2'>
              Tags
            </label>
            <ReactSelect
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              isMulti
              value={selectedTags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return {
                      label: tag.label,
                      id: tag.value,
                    };
                  }),
                );
              }}
            />
          </div>
        </form>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>
      </section>
      {showModal && <EditTagsModal onShowModal={handleShow} />}
    </>
  );
}
