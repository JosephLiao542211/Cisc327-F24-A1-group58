import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Landing from './Landing';
import Header from '../../components/Header/Header';
import HeroSection from './HeroSection/HeroSection';
import DealsSection from './DealsSection/DealsSection';
import Footer from '../../components/Footer/Footer';

jest.mock('../../components/Header/Header', () => () => <div>Header</div>);
jest.mock('./HeroSection/HeroSection', () => () => <div>HeroSection</div>);
jest.mock('./DealsSection/DealsSection', () => ({ flights }) => (
    <div>
        <div>DealsSection</div>
        {flights && flights.length > 0 && <div>Flight Data Loaded</div>}
    </div>
));
jest.mock('../../components/Footer/Footer', () => ({ token }) => <div>Footer with token: {token}</div>);

describe('Landing Component', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: 1, destination: 'Paris' }]),
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders Landing component correctly', () => {
        render(<Landing token="test-token" />);

        expect(screen.getByText(/header/i)).toBeInTheDocument();
        expect(screen.getByText(/herosection/i)).toBeInTheDocument();
        expect(screen.getByText(/footer with token/i)).toBeInTheDocument();
    });

    test('fetches and displays flight data', async () => {
        render(<Landing token="test-token" />);

        await waitFor(() => expect(screen.getByText(/flight data loaded/i)).toBeInTheDocument());
    });
});