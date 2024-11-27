import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Explore from './Explore';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

// Mock the FlightCard component
jest.mock('../../components/FlightCard/FlightCard', () => {
  return function DummyFlightCard({ description }) {
    return <div data-testid="flight-card">{description}</div>;
  };
});

jest.mock('../../assets/airport_img_catalogue', () => ({
  JFK: { image: 'new_york.jpg', location: 'New York, USA' },
  LAX: { image: 'los_angeles.jpg', location: 'Los Angeles, USA' },
  SFO: { image: 'san_francisco.jpg', location: 'San Francisco, USA' },
  ORD: { image: 'chicago.jpg', location: 'Chicago, USA' },
}));

describe('Explore Component Integration', () => {
  const mockFlights = [
    {
      id: 1,
      departureAirport: 'JFK',
      arrivalAirport: 'LAX',
      departureTime: '2023-10-15T10:00:00Z',
      economyPrice: 300,
      discount: true,
    },
    {
      id: 2,
      departureAirport: 'SFO',
      arrivalAirport: 'ORD',
      departureTime: '2023-10-20T12:00:00Z',
      economyPrice: 200,
      discount: false,
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockFlights });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders flight cards correctly', async () => {
    render(
      <Router>
        <Explore />
      </Router>
    );

    // Wait for flights to be fetched and rendered
    await waitFor(() => {
      const flightCards = screen.getAllByTestId('flight-card');
      expect(flightCards).toHaveLength(2);
      expect(flightCards[0]).toHaveTextContent('JFK → LAX');
      expect(flightCards[1]).toHaveTextContent('SFO → ORD');
    });
  });
});