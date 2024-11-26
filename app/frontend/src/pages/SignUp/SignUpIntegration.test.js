// SignUp.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from './SignUp';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { useNavigate } from 'react-router-dom';

fetchMock.enableMocks();

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('SignUp Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    window.alert = jest.fn();
  });

  test('creates a new user successfully and navigates to login', async () => {
    // Mock successful registration response
    fetch.mockResponseOnce(
      JSON.stringify({ message: 'User registered successfully!' }),
      { status: 201 }
    );

    render(<SignUp />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Phone Number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });

    // Agree to terms and conditions
    const termsCheckbox = screen.getByRole('checkbox');
    fireEvent.click(termsCheckbox);

    // Ensure the Register button is enabled
    const registerButton = screen.getByRole('button', { name: /Register/i });
    expect(registerButton).toBeEnabled();

    // Submit the form
    fireEvent.click(registerButton);

    // Wait for the fetch call to complete
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Check that the fetch call was made with correct data
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        email: 'john.doe@example.com',
        password: 'password123',
        termsAccepted: true,
      }),
    });

    // Check that the success alert was shown
    expect(window.alert).toHaveBeenCalledWith('User registered successfully!');

    // Check that navigation to login page occurred
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
