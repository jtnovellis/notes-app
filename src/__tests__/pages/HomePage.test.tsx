import { HomePage } from '../../pages/HomePage';
import { render, userEvent, screen } from '../../utils/test-utils';

describe('HomePage', () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  it('should render the title and contain the class text-4xl', () => {
    const title = screen.getByText('Notes');
    expect(title).toBeInTheDocument();
    expect(title.className).toContain('text-4xl');
  });

  it('should show a modal when click button edit tag', () => {
    const editTags = screen.getByText(/edit tags/i);
    userEvent.click(editTags);
    expect(screen.getByText('Edit Tags')).toBeInTheDocument();
  });

  it('should show a message when there are no notes', () => {
    const message = screen.getByText(/There are not notes. Please add a note./i);
    expect(message).toBeInTheDocument();
  });

  it('should not find notes when there is not exits', () => {
    const search = screen.getByPlaceholderText(/Search a note/i);
    userEvent.type(search, 'hello word');
    expect(screen.queryByText(/hello word/i)).not.toBeInTheDocument();
  });
});
