import { render, screen, fireEvent } from '@testing-library/react';
import UserCreation from '../components/UserCreation'; // Adjust the import based on your file structure

// Success Case
test('should create a new user successfully', () => {
  render(<UserCreation />);
  fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText('Create Account'));
  expect(screen.getByText('User created successfully')).toBeInTheDocument(); // Adjust message based on your app
});

// Failure Case
test('should show an error if username is already taken', () => {
  render(<UserCreation />);
  fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'existinguser' } });
  fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText('Create Account'));
  expect(screen.getByText('Username already taken')).toBeInTheDocument(); // Adjust message based on your app
});