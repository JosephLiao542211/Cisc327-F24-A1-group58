import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DealsSection from './DealsSection';
import '@testing-library/jest-dom/extend-expect';

describe('DealsSection Component', () => {
    const mockFlights = [
        { id: 1, imageURL: 'rome.jpg', description: 'Sept 17th', location: 'Rome, Italy', discount: '-20%' },
        { id: 2, imageURL: 'halongbay.jpg', description: 'Oct 26th', location: 'Ha Long Bay, Vietnam', discount: '-17%' },
        { id: 3, imageURL: 'tokyo.jpg', description: 'Oct 11th', location: 'Tokyo, Japan', discount: '-50%' },
    ];

    test('renders section title correctly', () => {
        render(<DealsSection flights={mockFlights} />);
        expect(screen.getByText(/Up to -40% 🎉 Airplane Travel exclusive deals/i)).toBeInTheDocument();
    });

    test('renders all category buttons', () => {
        render(<DealsSection flights={mockFlights} />);

        expect(screen.getByText('Europe')).toBeInTheDocument();
        expect(screen.getByText('Asia')).toBeInTheDocument();
        expect(screen.getByText('North America')).toBeInTheDocument();
        expect(screen.getByText('Other')).toBeInTheDocument();
    });

    test('renders FlightCard components with correct data', () => {
        render(<DealsSection flights={mockFlights} />);

        expect(screen.getByText('Rome, Italy')).toBeInTheDocument();
        expect(screen.getByText('Sept 17th')).toBeInTheDocument();
        expect(screen.getByText('-20%')).toBeInTheDocument();

        expect(screen.getByText('Ha Long Bay, Vietnam')).toBeInTheDocument();
        expect(screen.getByText('Oct 26th')).toBeInTheDocument();
        expect(screen.getByText('-17%')).toBeInTheDocument();

        expect(screen.getByText('Tokyo, Japan')).toBeInTheDocument();
        expect(screen.getByText('Oct 11th')).toBeInTheDocument();
        expect(screen.getByText('-50%')).toBeInTheDocument();
    });

    test('renders "Explore More" button', () => {
        render(<DealsSection flights={mockFlights} />);
        expect(screen.getByText('Explore More')).toBeInTheDocument();
    });

    test('renders fallback content if flights array is empty', () => {
        render(<DealsSection flights={[]} />);
        // You can check for the presence of the fallback div by matching the style or assuming a role or aria label.
        const fallbackDiv = screen.getByRole('region', { name: /fallback/i });
        expect(fallbackDiv).toBeInTheDocument();
    });
});