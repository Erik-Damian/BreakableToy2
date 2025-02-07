import { render, screen } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

describe('LoadingScreen', () => {
  const priceMessages = [
    "Finding the best deals.",
    "Finding best bang for your buck.",
    "Keeping your wallet safe.",
    "Looking for the most affordable deals.",
    "Negotiating prices.",
    "Loading the best prices.",
    "In for a penny, in for a flight."
  ];

  const durationMessages = [
    "Speeding up flights.",
    "Racing airlines.",
    "Looking for the fastest around.",
    "Searching for the quickest options.",
    "Keeping your time and money.",
    "Loading the shortest flights.",
    "The quick plane flew over the lazy chopper."
  ];

  it('renders a random message for price search', () => {
    render(<LoadingScreen type="price" />);
    const renderedMessage = screen.getByText((content) => priceMessages.some((msg) => content.startsWith(msg)));
    expect(renderedMessage).toBeInTheDocument();
  });

  it('renders a random message for duration search', () => {
    render(<LoadingScreen type="duration" />);
    const renderedMessage = screen.getByText((content) => durationMessages.some((msg) => content.startsWith(msg)));
    expect(renderedMessage).toBeInTheDocument();
  });
});
