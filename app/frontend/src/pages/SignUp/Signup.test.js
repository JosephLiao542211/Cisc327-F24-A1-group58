import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';

import { MemoryRouter } from 'react-router-dom';

global.fetch = jest.fn();

beforeEach(() => {
    fetch.mockClear();
});

describe('SignUp Component', () => {
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
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('should register a new user successfully', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: 'User registered successfully!' }),
        });

        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('checkbox'));

        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => expect(screen.getByText('User registered successfully!')).toBeInTheDocument());
    });

    test('should show an error if registration fails', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Registration failed!' }),
        });

        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'Jane' } });
        fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '0987654321' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'jane.doe@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('checkbox'));

        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => expect(screen.getByText('Registration failed!')).toBeInTheDocument());
    });

    test('Login button redirects to login page', () => {
        const { getByText } = render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        fireEvent.click(getByText('Login'));
        expect(window.location.pathname).toBe('/login');
    });
});