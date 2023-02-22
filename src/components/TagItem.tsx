interface TagItemProps {
  label: string;
}

export function TagItem({ label }: TagItemProps) {
  return (
    <div className='bg-purple-600 font-bold text-white rounded-md px-2 py-1'>
      <p role='listitem'>#{label}</p>
    </div>
  );
}
