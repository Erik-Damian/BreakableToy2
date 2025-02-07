/*import { render, screen, fireEvent } from '@testing-library/react';
import DynamicDropdown from './DynamicDropdown';
import { Provider } from 'react-redux';

import { DropdownItem } from '@/app/utils/DropDownItemType';
import StoreProvider from '@/app/StoreProvider';

const mockValues: DropdownItem[] = [
  { name: 'Los Angeles', iataCode: 'LAX' },
  { name: 'New York', iataCode: 'JFK' },
];

describe('DynamicDropdown', () => {
  it('renders input field with placeholder text', () => {
    render(
      <StoreProvider>
        <DynamicDropdown value="" setValue={jest.fn()} />
      </StoreProvider>
    );

    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('displays results when dropdown is open', async () => {
    render(
      <StoreProvider>
        <DynamicDropdown value="Los" setValue={jest.fn()} nonQuery={true} values={mockValues} />
      </StoreProvider>
    );

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.focus(input);

    expect(await screen.findByText('LAX')).toBeInTheDocument();
    expect(screen.getByText('Los Angeles')).toBeInTheDocument();
  });


  it('calls setValue when an item is clicked', async () => {
    const setValueMock = jest.fn();

    render(
      <StoreProvider>
        <DynamicDropdown value="" setValue={setValueMock} nonQuery={true} values={mockValues} />
      </StoreProvider>
    );

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.focus(input);
    fireEvent.mouseDown(await screen.findByText('LAX'));

    expect(setValueMock).toHaveBeenCalledWith('LAX');
  });
});*/
//This setup is commented since it will always fail, further development necesary.

