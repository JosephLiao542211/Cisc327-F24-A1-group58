import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddFlights from './AddFlights';

describe('AddFlights Component', () => {
    test('renders the AddFlights component and displays main elements', () => {
        render(<AddFlights />);

        // Check if primary sections of the AddFlights component are rendered
        expect(screen.getByText(/Add New Flight/i)).toBeInTheDocument();
        expect(screen.getByText(/All Users/i)).toBeInTheDocument();
        expect(screen.getByText(/Add New Plane/i)).toBeInTheDocument();
        expect(screen.getByText(/All Flights/i)).toBeInTheDocument();
    });

});