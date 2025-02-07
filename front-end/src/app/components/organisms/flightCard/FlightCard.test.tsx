import { render, screen, fireEvent } from '@testing-library/react';
import FlightCard from './FlightCard';
import { useRouter } from 'next/navigation';
import { FlightOffer } from '@/app/utils/FlghtSearchcTypes';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockFlight: FlightOffer = {
  type: 'flight-offer',
  id: '1',
  airlineName: 'Test Airline',
  itineraries: [
    {
      duration: 'PT3H',
      segments: [
        {
            departure: { airportName: 'Los Angeles Intl', iataCode: 'LAX', at: '2025-05-01T08:00:00' },
            arrival: { airportName: 'New York JFK', iataCode: 'JFK', at: '2025-05-01T11:00:00' },
            carrierCode: 'TA',
            duration: 'PT3H',
            id: 'segment1',
            numberOfStops: 0,
            blacklistedInEU: false,
            aircraft: { code: '320' },
            number: '1'
        },
      ],
    },
  ],
  price: {
      currency: 'USD', total: '300', base: '250', fees: [],
      grandTotal: ''
  },
  travelerPricings: [
    {
      travelerId: '1',
      travelerType: 'ADULT',
      fareOption: 'STANDARD',
      price: { currency: 'USD', total: '300', base: '250' },
      fareDetailsBySegment: [],
    },
  ],
  source: '',
  instantTicketingRequired: false,
  oneWay: false,
  lastTicketingDate: '',
  numberOfBookableSeats: 9,
  validatingAirlineCodes: [],
};

describe('FlightCard', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it('renders flight details correctly', () => {
    render(<FlightCard flight={mockFlight} id={0} />);
    expect(screen.getByText('Test Airline')).toBeInTheDocument();
    expect(screen.getByText('From: Los Angeles Intl (LAX)')).toBeInTheDocument();
    expect(screen.getByText('To: New York JFK (JFK)')).toBeInTheDocument();
  });

  it('displays price information', () => {
    render(<FlightCard flight={mockFlight} id={0} />);
    expect(screen.getByText('300 USD')).toBeInTheDocument();
    expect(screen.getByText('Per Traveler (1)')).toBeInTheDocument();
  });

  it('navigates to flight details page when clicked', () => {
    render(<FlightCard flight={mockFlight} id={0} />);
    fireEvent.click(screen.getByText('Test Airline'));
    expect(pushMock).toHaveBeenCalledWith('/details/1');
  });
});
