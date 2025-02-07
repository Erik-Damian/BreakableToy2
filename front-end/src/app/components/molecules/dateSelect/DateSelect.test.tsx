import { render, screen, fireEvent } from '@testing-library/react';
import DateSelect from './DateSelect';
import { useState } from 'react';

const Wrapper = () => {
  const [value, setValue] = useState<Date | null>(null);
  return <DateSelect value={value} onChange={setValue} />;
};

describe('DateSelect', () => {
  it('renders the date picker and button', () => {
    render(<Wrapper />);
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('sets today’s date when button is clicked', () => {
    render(<Wrapper />);
    fireEvent.click(screen.getByText('X'));
    expect(screen.getByDisplayValue(new Date().toISOString().slice(0, 10))).toBeInTheDocument();
  });
});
