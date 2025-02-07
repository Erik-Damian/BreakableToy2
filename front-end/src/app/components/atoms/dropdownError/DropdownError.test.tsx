import { render, screen } from '@testing-library/react';
import DropdownError from './DropdownError';

describe('DropdownError', () => {
  it('renders the error message', () => {
    render(<DropdownError />);
    expect(screen.getByText('No matching results found.')).toBeInTheDocument();
  });
});
