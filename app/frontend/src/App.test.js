import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('Navigation Links', () => {
    test('navigates to Home page when "Home" link is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <App />
            </MemoryRouter>
        );

        const homeLink = screen.getByText(/home/i);
        fireEvent.click(homeLink);
        expect(window.location.pathname).toBe('/');
    });

    test('navigates to Bookings page when "Bookings" link is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <App />
            </MemoryRouter>
        );

        const bookingsLink = screen.getByText(/bookings/i);
        fireEvent.click(bookingsLink);
        expect(window.location.pathname).toBe('/bookings');
    });

    test('navigates to Explore page when "Explore" link is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <App />
            </MemoryRouter>
        );

        const exploreLink = screen.getByText(/explore/i);
        fireEvent.click(exploreLink);
        expect(window.location.pathname).toBe('/explore');
    });

    test('navigates to Login/Signup page when "Login/Signup" link is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <App />
            </MemoryRouter>
        );

        const loginSignupLink = screen.getByText(/login\/signup/i);
        fireEvent.click(loginSignupLink);
        expect(window.location.pathname).toBe('/login');
    });
});