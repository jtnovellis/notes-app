import { RenderOptions, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NoteProvider } from '../context';

afterEach(() => {
  cleanup();
});

function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <NoteProvider>{children}</NoteProvider>
    </BrowserRouter>
  );
}

function customRender(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
