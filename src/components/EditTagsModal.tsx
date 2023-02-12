import { useNotes } from '../context';

interface EditTagsModalProps {
  onShowModal: () => void;
}
export function EditTagsModal({ onShowModal }: EditTagsModalProps) {
  const { tags, onUpdateTag, onDeleteTag } = useNotes();
  return (
    <div className='bg-black/30 h-screen w-screen absolute top-0 left-0 flex justify-center items-center'>
      <div className=' bg-white shadow-lg rounded-md p-4 z-20'>
        <div className='flex justify-between mb-4 items-center'>
          <h1 className='text-4xl font-bold text-gray-600'>Edit Tags</h1>
          <button onClick={onShowModal} className='px-3 py-2 text-4xl text-gray-500'>
            &times;
          </button>
        </div>
        <div className='border border-gray-300' />
        <form>
          <div className='grid grid-cols-1 gap-y-4 mt-4'>
            {tags.map((tag) => {
              return (
                <div key={tag.id} className='flex justify-between items-center gap-x-4'>
                  <input
                    type='text'
                    className='border border-gray-300 p-2 rounded-md'
                    value={tag.label}
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                  />
                  <button
                    onClick={() => onDeleteTag(tag.id)}
                    className='border border-red-500 text-red-500 px-4 py-2 rounded-md'
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
}
