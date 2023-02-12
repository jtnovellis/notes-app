interface TagItemProps {
  id: string;
  label: string;
}

export function TagItem({ id, label }: TagItemProps) {
  return (
    <div className='bg-purple-600 font-bold text-white rounded-md px-2 py-1'>
      <p>#{label}</p>
    </div>
  );
}
