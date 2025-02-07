import { render, screen, fireEvent } from '@testing-library/react';
import DropdownCard from './DropdownCard';

const mockProps = {
  item: { name: 'Los Angeles', iataCode: 'LAX' },
  onMouseDown: jest.fn(),
};

describe('DropdownCard', () => {
  it('renders the correct item details', () => {
    render(<DropdownCard {...mockProps} />);
    expect(screen.getByText('LAX')).toBeInTheDocument();
    expect(screen.getByText('Los Angeles')).toBeInTheDocument();
  });

  it('calls onMouseDown when clicked', () => {
    render(<DropdownCard {...mockProps} />);
    fireEvent.mouseDown(screen.getByText('LAX'));
    expect(mockProps.onMouseDown).toHaveBeenCalledTimes(1);
  });
});
