import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { HomePage } from '../pages/HomePage';
import { NewNotePage } from '../pages/NewNotePage';
import { RawNote, Tag } from '../types';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <Navigate to='/' />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'new',
        element: <NewNotePage />,
      },
      {
        path: '/:id',
        children: [
          {
            index: true,
            element: <h1>Show Element</h1>,
          },
          {
            path: 'edit',
            element: <h1>Edit</h1>,
          },
        ],
      },
    ],
  },
]);

function RootLayout() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);
  return (
    <>
      <header className='bg-purple-500 w-full h-20 mb-4' />
      <main className='container mx-auto'>
        <Outlet />
      </main>
    </>
  );
}
