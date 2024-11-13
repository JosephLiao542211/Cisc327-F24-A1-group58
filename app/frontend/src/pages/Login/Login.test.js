// Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock fetch API
global.fetch = jest.fn();

// Mock window.alert
window.alert = jest.fn();

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Login Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    fetch.mockClear();
    window.alert.mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
    require('react-router-dom').useNavigate.mockClear();
  });

  test('renders Login component correctly', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /login/i })
    ).toBeInTheDocument();
  });

  test('allows user to input email and password', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('allows user to log in successfully', async () => {
    const mockNavigate = jest.fn();
    const mockResponse = {
      message: 'Login successful',
      token: 'fake-token',
      userId: '12345',
    };

    // Mock useNavigate to return our mockNavigate function
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    // Mock fetch to return a resolved promise with mockResponse
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    });
    fireEvent.click(loginButton);

    // Wait for the navigation to be called
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/12345'));

    // Check that the token is stored in localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'token',
      'fake-token'
    );

    // Check that alert was called with the success message
    expect(window.alert).toHaveBeenCalledWith('Login successful');
  });

  test('shows error message when login fails due to incorrect credentials', async () => {
    const mockResponse = {
      error: 'Invalid credentials',
    };

    // Mock fetch to return a resolved promise with mockResponse
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(loginButton);

    // Wait for the alert to be called
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith('Invalid credentials')
    );

    // Ensure navigation was not called
    const mockNavigate = require('react-router-dom').useNavigate();
    expect(mockNavigate).not.toHaveBeenCalled();

    // Ensure token is not stored in localStorage
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  test('shows error message when there is a network error', async () => {
    // Mock fetch to reject the promise
    fetch.mockRejectedValueOnce(new Error('Network Error'));

    console.error = jest.fn(); // Mock console.error to suppress error output

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    });
    fireEvent.click(loginButton);

    // Wait for the alert to be called
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        'An error occurred during login. Please try again later.'
      )
    );

    // Ensure navigation was not called
    const mockNavigate = require('react-router-dom').useNavigate();
    expect(mockNavigate).not.toHaveBeenCalled();

    // Ensure token is not stored in localStorage
    expect(localStorageMock.setItem).not.toHaveBeenCalled();

    // Check that console.error was called
    expect(console.error).toHaveBeenCalledWith(
      'Error during login:',
      expect.any(Error)
    );
  });

  test('disables login button when loading', async () => {
    const mockResponse = {
      message: 'Login successful',
      token: 'fake-token',
      userId: '12345',
    };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Initially, the button should not be disabled
    expect(loginButton).not.toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    });

    fireEvent.click(loginButton);

    // Button should be disabled after clicking
    expect(loginButton).toBeDisabled();

    // Wait for the button to be enabled again
    await waitFor(() => expect(loginButton).not.toBeDisabled());
  });

  test("shows 'Logging in...' on the button when loading", async () => {
    const mockResponse = {
      message: 'Login successful',
      token: 'fake-token',
      userId: '12345',
    };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, {
      target: { value: 'password123' },
    });

    fireEvent.click(loginButton);

    // Button should show 'Logging in...' when loading
    expect(loginButton).toHaveTextContent('Logging in...');

    // Wait for the button text to change back
    await waitFor(() => expect(loginButton).toHaveTextContent('Login'));
  });
});
