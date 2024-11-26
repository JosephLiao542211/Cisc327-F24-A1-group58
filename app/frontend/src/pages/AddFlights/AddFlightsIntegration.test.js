// AddFlightsIntegration.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddFlights from './AddFlights';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let axiosMock;

beforeEach(() => {
  axiosMock = new MockAdapter(axios);
});

afterEach(() => {
  axiosMock.reset();
  axiosMock.restore();
});

// Enable fetch mocks
fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
});

describe('AddFlights Integration Test', () => {
  let axiosMock;

  beforeEach(() => {
    // Reset mocks before each test
    fetch.resetMocks();
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.restore();
  });

  test('submits flight data successfully', async () => {
    // Mock fetching plane IDs (from AddFlightForm component)
    fetch.mockResponseOnce(JSON.stringify(['Plane1', 'Plane2', 'Plane3']));

    // Mock fetching users
    axiosMock.onGet('http://localhost:5000/api/users').reply(200, []);

    // Mock fetching flights
    axiosMock.onGet('http://localhost:5000/api/flight').reply(200, []);

    // Mock posting new flight
    const mockFlightResponse = {
      _id: '507f1f77bcf86cd799439011',
      flightNumber: '1234',
      airline: 'Test Airline',
      departureAirport: 'AAA',
      arrivalAirport: 'BBB',
      departureTime: '2023-10-10T10:00:00.000Z',
      arrivalTime: '2023-10-10T12:00:00.000Z',
      economyPrice: 200,
      firstclassPrice: 500,
      planeID: 'Plane1',
      discount: 10,
      seatMap: [],
      statusId: '507f1f77bcf86cd799439012',
    };

    axiosMock.onPost('http://localhost:5000/api/flight').reply(201, mockFlightResponse);

    // Mock window alert
    window.alert = jest.fn();

    render(<AddFlights />);

    // Wait for plane IDs to be loaded
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

        // Flight Number
    const flightNumberInput = screen.getByLabelText(/Flight Number:/i);
    userEvent.clear(flightNumberInput);
    userEvent.type(flightNumberInput, '1234');
    expect(flightNumberInput).toHaveValue('1234');

    // Airline
    const airlineInput = screen.getByLabelText(/Airline:/i);
    userEvent.type(airlineInput, 'Test Airline');
    expect(airlineInput).toHaveValue('Test Airline');

    // Departure Airport
    const departureAirportInput = screen.getByLabelText(/Departure Airport:/i);
    userEvent.type(departureAirportInput, 'AAA');
    expect(departureAirportInput).toHaveValue('AAA');

    // Arrival Airport
    const arrivalAirportInput = screen.getByLabelText(/Arrival Airport:/i);
    userEvent.type(arrivalAirportInput, 'BBB');
    expect(arrivalAirportInput).toHaveValue('BBB');

    // Departure Time
    const departureTimeInput = screen.getByLabelText(/Departure Time:/i);
    departureTimeInput.value = '2023-10-10T10:00';
    departureTimeInput.dispatchEvent(new Event('input', { bubbles: true }));
    expect(departureTimeInput).toHaveValue('2023-10-10T10:00');

    // Arrival Time
    const arrivalTimeInput = screen.getByLabelText(/Arrival Time:/i);
    arrivalTimeInput.value = '2023-10-10T12:00';
    arrivalTimeInput.dispatchEvent(new Event('input', { bubbles: true }));
    expect(arrivalTimeInput).toHaveValue('2023-10-10T12:00');

    // Economy Price
    const economyPriceInput = screen.getByLabelText(/Economy Price:/i);
    userEvent.clear(economyPriceInput);
    userEvent.type(economyPriceInput, '200');
    expect(economyPriceInput).toHaveValue(200);

    // First Class Price
    const firstclassPriceInput = screen.getByLabelText(/First Class Price:/i);
    userEvent.clear(firstclassPriceInput);
    userEvent.type(firstclassPriceInput, '500');
    expect(firstclassPriceInput).toHaveValue(500);

    // Plane ID
    const planeIDSelect = screen.getByLabelText(/Plane ID:/i);
    userEvent.selectOptions(planeIDSelect, 'Plane1');
    expect(planeIDSelect).toHaveValue('Plane1');

    // Discount
    const discountInput = screen.getByLabelText(/Discount \(%\):/i);
    userEvent.clear(discountInput);
    userEvent.type(discountInput, '10');
    expect(discountInput).toHaveValue(10);
  

    // Submit the form
    userEvent.click(screen.getByRole('button', { name: /Add Flight/i }));

    // Assert that the post request was made with correct data
    await waitFor(() => {
      expect(axiosMock.history.post.length).toBe(1);
      expect(axiosMock.history.post[0].url).toBe('http://localhost:5000/api/flight');
      expect(JSON.parse(axiosMock.history.post[0].data)).toEqual({
        flightNumber: '1234',
        airline: 'Test Airline',
        departureAirport: 'AAA',
        arrivalAirport: 'BBB',
        departureTime: '2023-10-10T10:00',
        arrivalTime: '2023-10-10T12:00',
        economyPrice: '200',
        firstclassPrice: '500',
        planeID: 'Plane1',
        discount: '10',
      });
    });

    // Assert that the success alert was shown
    expect(window.alert).toHaveBeenCalledWith('Flight added successfully!');

    // Optionally, you can check if the form was reset
    expect(screen.getByLabelText(/Flight Number:/i)).toHaveValue('');
  });
});
