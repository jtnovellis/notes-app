import { FormEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { Tag } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useNotes } from '../context';

export function NoteFrom() {
  const { onAddTag, tags: availableTags, onCreateNote } = useNotes();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onCreateNote({
      title: titleRef.current!.value,
      body: bodyRef.current!.value,
      tags: selectedTags,
    });
    navigate('..');
  }

  return (
    <form className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
      <div className='grid grid-cols-2 gap-x-4 items-center'>
        <div className='flex flex-col'>
          <label htmlFor='title' className='text-gray-600 mb-2'>
            Title
          </label>
          <input
            required
            ref={titleRef}
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
          <CreatableReactSelect
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onCreateOption={(label) => {
              const newTag = { id: uuidv4(), label };
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
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
      </div>
      <div className='flex flex-col'>
        <label htmlFor='body' className='text-gray-600 mb-2'>
          Body
        </label>
        <textarea
          required
          name='body'
          id='body'
          ref={bodyRef}
          rows={15}
          className='border border-gray-400 rounded-md px-3 py-[5.5px]'
        />
      </div>
      <div className='flex justify-end items-center gap-x-6'>
        <Link
          to='..'
          className='bg-gray-300 hover:bg-gray-600 px-5 py-2 rounded-lg font-bold text-gray-600 hover:text-white'
        >
          Cancel
        </Link>
        <button
          className='bg-purple-500 hover:bg-purple-400 px-7 py-2 rounded-lg font-bold text-white'
          type='submit'
        >
          Save
        </button>
      </div>
    </form>
  );
}
