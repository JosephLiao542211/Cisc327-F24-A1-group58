// DealsSection.test.js
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import DealsSection from './DealsSection';
import axios from 'axios';

// Mock axios to prevent actual API calls during tests
jest.mock('axios');

// Mock the FlightCard component to simplify testing
jest.mock('../../../components/FlightCard/FlightCard', () => (props) => (
  <div className="flight-card">
    <div>{props.description}</div>
  </div>
));

describe('DealsSection Component', () => {
  const mockFlights = [
    {
      id: 1,
      departureAirport: 'JFK',
      arrivalAirport: 'LAX',
      departureTime: '2023-10-15T10:00:00Z',
      economyPrice: 300,
      discount: 20,
    },
    {
      id: 2,
      departureAirport: 'SFO',
      arrivalAirport: 'ORD',
      departureTime: '2023-10-20T12:00:00Z',
      economyPrice: 200,
      discount: 0,
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockFlights });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly and fetches discounted flights', async () => {
    let component;
    await act(async () => {
      component = renderer.create(<DealsSection />);
    });

    const instance = component.root;

    // Check that only flights with a discount are displayed
    const flightCards = instance.findAllByProps({ className: 'flight-card' });
    expect(flightCards).toHaveLength(1);

    // Verify that the displayed flight has a discount
    expect(flightCards[0].children[0].children).toContain(
      expect.stringContaining('Oct 15')
    );

    // Optionally, you can add a snapshot test
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('displays "NO DISCOUNTED FLIGHTS" when no flights have a discount', async () => {
    // Mock axios to return flights with no discounts
    axios.get.mockResolvedValue({
      data: [
        {
          id: 3,
          departureAirport: 'ATL',
          arrivalAirport: 'MIA',
          departureTime: '2023-10-25T08:00:00Z',
          economyPrice: 150,
          discount: 0,
        },
      ],
    });

    let component;
    await act(async () => {
      component = renderer.create(<DealsSection />);
    });

    const instance = component.root;

    // Check that the "NO DISCOUNTED FLIGHTS" message is displayed
    const noFlightsMessage = instance.findByProps({ className: 'no-flights-message' });
    expect(noFlightsMessage.children).toContain('NO DISCOUNTED FLIGHTS');
  });

  test('handles API error gracefully', async () => {
    // Mock axios to throw an error
    axios.get.mockRejectedValue(new Error('Network Error'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    let component;
    await act(async () => {
      component = renderer.create(<DealsSection />);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching flights:',
      expect.any(Error)
    );

    // Ensure that the "NO DISCOUNTED FLIGHTS" message is displayed
    const instance = component.root;
    const noFlightsMessage = instance.findByProps({ className: 'no-flights-message' });
    expect(noFlightsMessage.children).toContain('NO DISCOUNTED FLIGHTS');

    consoleErrorSpy.mockRestore();
  });

  test('Explore All Flights button navigates to /explore', async () => {
    // Mock window.location.href
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    let component;
    await act(async () => {
      component = renderer.create(<DealsSection />);
    });

    const instance = component.root;

    const exploreButton = instance.findByProps({ className: 'explore-button' });
    act(() => {
      exploreButton.props.onClick();
    });

    expect(window.location.href).toBe('/explore');

    // Restore original window.location
    window.location = originalLocation;
  });

  test('renders category buttons', async () => {
    let component;
    await act(async () => {
      component = renderer.create(<DealsSection />);
    });

    const instance = component.root;

    const categoryButtons = instance.findAllByProps({ className: 'category-button' });
    expect(categoryButtons).toHaveLength(4);

    const categories = ['Europe', 'Asia', 'North America', 'Other'];
    categories.forEach((category, index) => {
      expect(categoryButtons[index].children).toContain(category);
    });
  });
});
