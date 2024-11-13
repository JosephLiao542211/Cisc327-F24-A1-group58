import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import AddFlights from './AddFlights';

jest.mock('axios');

const server = setupServer(
  rest.get('http://localhost:5000/api/users', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: 'User 1' }]));
  }),
  rest.get('http://localhost:5000/api/flight', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, flightNumber: '123' }]));
  }),
  rest.post('http://localhost:5000/api/flight', (req, res, ctx) => {
    return res(ctx.json({ id: 2, flightNumber: '456' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('AddFlights Component', () => {

  test('renders components and fetches initial data', async () => {
    render(<AddFlights />);

    expect(screen.getByText('Add New Flight')).toBeInTheDocument();
    expect(screen.getByText('All Flights')).toBeInTheDocument();
    expect(screen.getByText('All Users')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('User 1')).toBeInTheDocument());

    await waitFor(() => expect(screen.getByText('123')).toBeInTheDocument());
  });

  test('handles form input changes and submission', async () => {
    render(<AddFlights />);

    fireEvent.change(screen.getByLabelText(/Flight Number/i), { target: { value: '456' } });
    fireEvent.change(screen.getByLabelText(/Airline/i), { target: { value: 'Airline Test' } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => expect(screen.getByText('Flight added successfully!')).toBeInTheDocument());
  });

  test('opens and closes lightbox when a flight is selected', async () => {
    render(<AddFlights />);

    fireEvent.click(screen.getByText('123'));

    await waitFor(() => expect(screen.getByText('Update Flight')).toBeInTheDocument());

    fireEvent.click(screen.getByText(/Close/i));
    expect(screen.queryByText('Update Flight')).not.toBeInTheDocument();
  });

  test('displays error message if flight number already exists on submission', async () => {
    server.use(
      rest.post('http://localhost:5000/api/flight', (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'Flight number already exists' }));
      })
    );

    render(<AddFlights />);

    fireEvent.change(screen.getByLabelText(/Flight Number/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => expect(screen.getByText('Error: Flight number already exists.')).toBeInTheDocument());
  });
});

describe('AddFlights Component', () => {
    test('renders the AddFlights component and displays main elements', () => {
        render(<AddFlights />);

        expect(screen.getByText(/Add New Flight/i)).toBeInTheDocument();
        expect(screen.getByText(/All Users/i)).toBeInTheDocument();
        expect(screen.getByText(/Add New Plane/i)).toBeInTheDocument();
        expect(screen.getByText(/All Flights/i)).toBeInTheDocument();
    });

});