import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        navigate('/login'); // Redirect to login page
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
        if (data.message === 'User registered successfully!') {
            
            alert(data.message);
            navigate('/login'); 
            // Redirect to login page on successful registration
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="App">
            <img src="logo.png" alt="Logo" style={{ marginBottom: '0px', height: '60px' }} />
            <div className='text-container'>
                <h2>Register</h2>
                <p><strong>Book your flight now</strong> to lock in the best rates! Enjoy a smooth and convenient travel experience as you head to your destination. <strong>Don't wait—reserve your seat today!</strong></p>
            </div>
                
            <form onSubmit={handleSubmit}>
                <div className='names'>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                </div>
                
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <div className='terms-container'> 
                <input
                    type="checkbox"
                    required
                    style={{ marginRight: '10px' }}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                />
                <p>I agree to all terms and conditions</p>
                </div>
            
                <button className="sign-button" type="submit" disabled={!formData.termsAccepted}>Register</button>
                
                <button className="grey-button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
}

export default SignUp;
