import { render, screen } from '@testing-library/react';
import DropdownModal from './DropdownModal';

describe('DropdownModal', () => {
  it('renders the loading icon and initial text', () => {
    render(<DropdownModal />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
    expect(screen.getByAltText('load icon')).toBeInTheDocument();
  });
});
