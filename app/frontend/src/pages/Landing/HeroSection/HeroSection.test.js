import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from './HeroSection';

describe('HeroSection Component', () => {
  test('renders Airplane header logo correctly', () => {
    // Test for the logo if it's part of the header in the HeroSection component
    const { container } = render(<HeroSection />);
    const logo = container.querySelector('img[alt="Airplane"]');
    expect(logo).toBeInTheDocument();
  });

  test('renders greeting message with user name', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Hello 👋,/i)).toBeInTheDocument();
    expect(screen.getByText(/Joseph/i)).toBeInTheDocument();
  });

  test('renders "Ready to EXPLORE?" prompt', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Ready to/i)).toBeInTheDocument();
    expect(screen.getByText(/EXPLORE/i)).toBeInTheDocument();
  });

  test('renders search input and button', () => {
    render(<HeroSection />);
    const input = screen.getByPlaceholderText(/Where do you want to go?/i);
    const button = screen.getByRole('button', { name: /Search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('renders navigation links (if available in header)', () => {
    render(<HeroSection />);
    // Assuming that navigation links like "Home", "Bookings" etc., are part of the header
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Bookings/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore/i)).toBeInTheDocument();
    expect(screen.getByText(/Login\/Signup/i)).toBeInTheDocument();
  });
});