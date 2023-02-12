import { Link } from 'react-router-dom';
import { Tag } from '../types';
import { TagItem } from './TagItem';

interface NoteCardProps {
  title: string;
  id: string;
  tags: Tag[];
}
export function NoteCard({ title, id, tags }: NoteCardProps) {
  const hasTags = tags.length > 0;

  return (
    <Link
      to={`/${id}`}
      className='border border-gray-200 p-3 rounded-md hover:scale-105 shadow-sm hover:shadow-xl transition duration-300'
    >
      <h2 className='text-xl font-bold'>{title}</h2>
      <p className='text-gray-600 mt-2'>Tags:</p>
      <div className='flex flex-wrap justify-center items-center gap-3'>
        {hasTags ? (
          tags.map((tag) => <TagItem key={tag.id} {...tag} />)
        ) : (
          <p className='text-gray-400'>No Tags</p>
        )}
      </div>
    </Link>
  );
}
