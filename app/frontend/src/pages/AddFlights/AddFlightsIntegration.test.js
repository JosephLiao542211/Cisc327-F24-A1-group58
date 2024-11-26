// AddFlights.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddFlights from './AddFlights';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Enable fetch mocks
fetchMock.enableMocks();

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
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Fill out the form
    userEvent.type(screen.getByLabelText(/Flight Number:/i), '1234');
    userEvent.type(screen.getByLabelText(/Airline:/i), 'Test Airline');
    userEvent.type(screen.getByLabelText(/Departure Airport:/i), 'AAA');
    userEvent.type(screen.getByLabelText(/Arrival Airport:/i), 'BBB');
    userEvent.type(screen.getByLabelText(/Departure Time:/i), '2023-10-10T10:00');
    userEvent.type(screen.getByLabelText(/Arrival Time:/i), '2023-10-10T12:00');
    userEvent.type(screen.getByLabelText(/Economy Price:/i), '200');
    userEvent.type(screen.getByLabelText(/First Class Price:/i), '500');
    userEvent.selectOptions(screen.getByLabelText(/Plane ID:/i), ['Plane1']);
    userEvent.type(screen.getByLabelText(/Discount \(%\):/i), '10');

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

  test('shows error when flight number already exists', async () => {
    // Mock fetching plane IDs
    fetch.mockResponseOnce(JSON.stringify(['Plane1', 'Plane2', 'Plane3']));

    // Mock fetching users
    axiosMock.onGet('http://localhost:5000/api/users').reply(200, []);

    // Mock fetching flights
    axiosMock.onGet('http://localhost:5000/api/flight').reply(200, []);

    // Mock posting new flight with duplicate flight number error
    axiosMock
      .onPost('http://localhost:5000/api/flight')
      .reply(400, { message: 'Flight number must be unique.' });

    // Mock window alert
    window.alert = jest.fn();

    render(<AddFlights />);

    // Wait for plane IDs to be loaded
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Fill out the form with a duplicate flight number
    userEvent.type(screen.getByLabelText(/Flight Number:/i), '1234');
    userEvent.type(screen.getByLabelText(/Airline:/i), 'Test Airline');
    // ... (fill other required fields)

    // Submit the form
    userEvent.click(screen.getByRole('button', { name: /Add Flight/i }));

    // Wait for the post request
    await waitFor(() => {
      expect(axiosMock.history.post.length).toBe(1);
    });

    // Assert that the error alert was shown
    expect(window.alert).toHaveBeenCalledWith('Error: Flight number already exists.');
  });
});
