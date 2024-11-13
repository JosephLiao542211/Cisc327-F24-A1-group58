// Explore.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Explore from './Explore';
import axios from 'axios';
import airportImageCatalogue from '../../assets/airport_img_catalogue';

// Mock axios
jest.mock('axios');

// Mock the FlightCard component
jest.mock('../../components/FlightCard/FlightCard', () => (props) => (
  <div data-testid="flight-card">
    <div>{props.description}</div>
  </div>
));

describe('Explore Component', () => {
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

  test('renders without crashing and fetches flights', async () => {
    render(<Explore />);

    // Wait for flights to be fetched and rendered
    const flightCards = await waitFor(() => screen.getAllByTestId('flight-card'));
    expect(flightCards).toHaveLength(mockFlights.length);
  });

  test('displays "NO DISCOUNTED FLIGHTS" message when no flights match filters', async () => {
    render(<Explore />);

    // Wait for flights to be fetched
    await waitFor(() => screen.getAllByTestId('flight-card'));

    // Apply filters that will result in no flights being displayed
    const discountCheckbox = screen.getByLabelText(/Discounted Flights Only/i);
    fireEvent.click(discountCheckbox);

    const dateInput = screen.getByLabelText(/Departure Date/i);
    fireEvent.change(dateInput, { target: { value: '2023-10-25' } });

    // Verify that the "NO DISCOUNTED FLIGHTS" message is displayed
    expect(screen.getByText(/NO DISCOUNTED FLIGHTS/i)).toBeInTheDocument();
  });

  test('filters flights by discount', async () => {
    render(<Explore />);

    // Wait for flights to be fetched
    await waitFor(() => screen.getAllByTestId('flight-card'));

    // Apply discount filter
    const discountCheckbox = screen.getByLabelText(/Discounted Flights Only/i);
    fireEvent.click(discountCheckbox);

    // Verify that only discounted flights are displayed
    const flightCards = screen.getAllByTestId('flight-card');
    expect(flightCards).toHaveLength(1);
    expect(screen.getByText(/JFK → LAX/i)).toBeInTheDocument();
  });

  test('filters flights by departure date', async () => {
    render(<Explore />);

    // Wait for flights to be fetched
    await waitFor(() => screen.getAllByTestId('flight-card'));

    // Apply date filter
    const dateInput = screen.getByLabelText(/Departure Date/i);
    fireEvent.change(dateInput, { target: { value: '2023-10-15' } });

    // Verify that only flights matching the date are displayed
    const flightCards = screen.getAllByTestId('flight-card');
    expect(flightCards).toHaveLength(1);
    expect(screen.getByText(/JFK → LAX/i)).toBeInTheDocument();
  });

  test('filters flights by price range', async () => {
    render(<Explore />);

    // Wait for flights to be fetched
    await waitFor(() => screen.getAllByTestId('flight-card'));

    // Apply price filter
    const minPriceInput = screen.getByPlaceholderText(/Min Price/i);
    const maxPriceInput = screen.getByPlaceholderText(/Max Price/i);
    fireEvent.change(minPriceInput, { target: { value: '250' } });
    fireEvent.change(maxPriceInput, { target: { value: '350' } });

    // Verify that only flights within the price range are displayed
    const flightCards = screen.getAllByTestId('flight-card');
    expect(flightCards).toHaveLength(1);
    expect(screen.getByText(/JFK → LAX/i)).toBeInTheDocument();
  });

  test('filters flights by departure airport', async () => {
    render(<Explore />);

    // Wait for flights to be fetched
    await waitFor(() => screen.getAllByTestId('flight-card'));

    // Apply departure airport filter
    const departureAirportInput = screen.getByPlaceholderText(/Departure Airport/i);
    fireEvent.change(departureAirportInput, { target: { value: 'SFO' } });

    // Verify that only flights from SFO are displayed
    const flightCards = screen.getAllByTestId('flight-card');
    expect(flightCards).toHaveLength(1);
    expect(screen.getByText(/SFO → ORD/i)).toBeInTheDocument();
  });

  test('filters flights by arrival airport', async () => {
    render(<Explore />);

    // Wait for flights to be fetched
    await waitFor(() => screen.getAllByTestId('flight-card'));

    // Apply arrival airport filter
    const arrivalAirportInput = screen.getByPlaceholderText(/Arrival Airport/i);
    fireEvent.change(arrivalAirportInput, { target: { value: 'LAX' } });

    // Verify that only flights arriving at LAX are displayed
    const flightCards = screen.getAllByTestId('flight-card');
    expect(flightCards).toHaveLength(1);
    expect(screen.getByText(/JFK → LAX/i)).toBeInTheDocument();
  });

  test('applies multiple filters simultaneously', async () => {
    render(<Explore />);

    // Wait for flights to be fetched
    await waitFor(() => screen.getAllByTestId('flight-card'));

    // Apply multiple filters
    const discountCheckbox = screen.getByLabelText(/Discounted Flights Only/i);
    fireEvent.click(discountCheckbox);

    const dateInput = screen.getByLabelText(/Departure Date/i);
    fireEvent.change(dateInput, { target: { value: '2023-10-15' } });

    const minPriceInput = screen.getByPlaceholderText(/Min Price/i);
    fireEvent.change(minPriceInput, { target: { value: '250' } });

    // Verify that only flights matching all filters are displayed
    const flightCards = screen.getAllByTestId('flight-card');
    expect(flightCards).toHaveLength(1);
    expect(screen.getByText(/JFK → LAX/i)).toBeInTheDocument();
  });

  test('handles no flights returned from API', async () => {
    // Mock axios to return empty data
    axios.get.mockResolvedValue({ data: [] });

    render(<Explore />);

    // Verify that the "NO DISCOUNTED FLIGHTS" message is displayed
    await waitFor(() => {
      expect(screen.getByText(/NO DISCOUNTED FLIGHTS/i)).toBeInTheDocument();
    });
  });

  test('handles API error gracefully', async () => {
    // Mock axios to throw an error
    axios.get.mockRejectedValue(new Error('Network Error'));

    render(<Explore />);

    // Verify that an error message is logged (you can also mock console.error)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });
});
