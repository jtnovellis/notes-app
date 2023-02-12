import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { NoteLayout } from '../components/NoteLayout';
import { NoteProvider } from '../context';
import { HomePage } from '../pages/HomePage';
import { NewNotePage } from '../pages/NewNotePage';
import { NotePage } from '../pages/NotePage';

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
        element: <NoteLayout />,
        children: [
          {
            index: true,
            element: <NotePage />,
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
  return (
    <>
      <header className='bg-purple-500 w-full h-20 mb-4' />
      <main className='container mx-auto px-4'>
        <NoteProvider>
          <Outlet />
        </NoteProvider>
      </main>
    </>
  );
}
