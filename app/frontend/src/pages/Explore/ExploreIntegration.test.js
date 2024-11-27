import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Explore from './Explore';
import FlightCard from '../../components/FlightCard/FlightCard';

jest.mock('axios');

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

  test('integrates with FlightCard and applies filters correctly', async () => {
    render(<Explore />);

    // Wait for flights to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText((content, element) => {
        return element.textContent.includes('JFK → LAX');
      })).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return element.textContent.includes('SFO → ORD');
      })).toBeInTheDocument();
    });

    // Check if FlightCard components are rendered with correct props
    expect(screen.getByText('New York, USA')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, USA')).toBeInTheDocument();

    // Apply discount filter
    fireEvent.click(screen.getByLabelText(/Discounted Flights Only/i));
    await waitFor(() => {
      expect(screen.getByText((content, element) => {
        return element.textContent.includes('JFK → LAX');
      })).toBeInTheDocument();
      expect(screen.queryByText((content, element) => {
        return element.textContent.includes('SFO → ORD');
      })).not.toBeInTheDocument();
    });

    // Apply date filter
    fireEvent.change(screen.getByLabelText(/Departure Date/i), { target: { value: '2023-10-15' } });
    await waitFor(() => {
      expect(screen.getByText((content, element) => {
        return element.textContent.includes('JFK → LAX');
      })).toBeInTheDocument();
      expect(screen.queryByText((content, element) => {
        return element.textContent.includes('SFO → ORD');
      })).not.toBeInTheDocument();
    });

    // Apply price filter
    fireEvent.change(screen.getByPlaceholderText(/Min Price/i), { target: { value: '250' } });
    fireEvent.change(screen.getByPlaceholderText(/Max Price/i), { target: { value: '350' } });
    await waitFor(() => {
      expect(screen.getByText((content, element) => {
        return element.textContent.includes('JFK → LAX');
      })).toBeInTheDocument();
      expect(screen.queryByText((content, element) => {
        return element.textContent.includes('SFO → ORD');
      })).not.toBeInTheDocument();
    });

    // Clear filters
    fireEvent.click(screen.getByLabelText(/Discounted Flights Only/i));
    fireEvent.change(screen.getByLabelText(/Departure Date/i), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText(/Min Price/i), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText(/Max Price/i), { target: { value: '' } });

    // Verify all flights are displayed again
    await waitFor(() => {
      expect(screen.getByText((content, element) => {
        return element.textContent.includes('JFK → LAX');
      })).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        return element.textContent.includes('SFO → ORD');
      })).toBeInTheDocument();
    });
  });
});