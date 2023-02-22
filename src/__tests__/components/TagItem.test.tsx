import { TagItem } from '../../components/TagItem';
import { render, screen } from '../../utils/test-utils';

describe('TagItem', () => {
  beforeEach(() => {
    render(<TagItem label='test' />);
  });

  it('should render the label', () => {
    expect(screen.getByText('#test')).toBeInTheDocument();
  });
});
