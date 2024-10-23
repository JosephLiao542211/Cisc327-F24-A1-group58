import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data);

            if (data.message === 'Login successful') {
                alert(data.message);
                localStorage.setItem('token', data.token); // Store token
                navigate('/'); // Redirect to home page
            } else {
                alert(data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className='login-body'>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <img src="logo.png" alt="Logo" style={{ marginBottom: '0px', height: '60px' }} />
            <div className='text-container'>
                <h2>Sign In</h2>
                <p><strong>Book your flight now</strong> to lock in the best rates! Enjoy a smooth and convenient travel experience as you head to your destination. <strong>Don't wait—reserve your seat today!</strong></p>
            </div>
                
                <form onSubmit={handleSubmit} className='login-form'>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ marginBottom: '10px', padding: '8px' }}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ marginBottom: '10px', padding: '8px' }}
                        />
                    </label>
                  
                    <button
                        type="submit"
                        disabled={loading}
                        className='login-button'
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
