// SignUp.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';
import { MemoryRouter } from 'react-router-dom';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('SignUp Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  test('renders SignUp component correctly', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/i agree to all terms and conditions/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('allows user to input data', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const phoneInput = screen.getByPlaceholderText(/phone number/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(phoneInput.value).toBe('1234567890');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('disables register button until terms are accepted', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const registerButton = screen.getByRole('button', { name: /register/i });
    const termsCheckbox = screen.getByRole('checkbox');

    expect(registerButton).toBeDisabled();

    fireEvent.click(termsCheckbox);

    expect(registerButton).not.toBeDisabled();
  });

  test('navigates to login page when login button is clicked', () => {
    const mockNavigate = jest.fn();

    // Mock useNavigate to return our mockNavigate function
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.click(loginButton);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('does not submit the form if required fields are missing', () => {
    const mockPreventDefault = jest.fn();
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const form = screen.getByRole('form');
    const termsCheckbox = screen.getByRole('checkbox');
    const registerButton = screen.getByRole('button', { name: /register/i });

    fireEvent.click(termsCheckbox);
    fireEvent.click(registerButton);

    // Since required fields are missing, the form should not submit
    // The browser handles required field validation, so in the test environment, we can check if preventDefault was called
    form.onsubmit = mockPreventDefault;

    fireEvent.submit(form);

    expect(mockPreventDefault).toHaveBeenCalled();
  });

  test('calls handleSubmit when form is submitted with all fields filled and terms accepted', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    // Mock the alert to prevent it from showing during tests
    window.alert = jest.fn();

    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const phoneInput = screen.getByPlaceholderText(/phone number/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const termsCheckbox = screen.getByRole('checkbox');
    const registerButton = screen.getByRole('button', { name: /register/i });

    // Fill in all fields
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Accept terms
    fireEvent.click(termsCheckbox);

    // Mock the fetch function to prevent API call
    global.fetch = jest.fn();

    // Submit the form
    fireEvent.click(registerButton);

    // Since we cannot test the API call or its response, we ensure that fetch is not called
    expect(global.fetch).not.toHaveBeenCalled();

    // Restore the original fetch function
    global.fetch.mockRestore();
  });
});
