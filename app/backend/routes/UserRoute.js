const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure the path is correct

// Route to fetch all users
router.get('/user', async (req, res) => {
    res.send('Welcome to USER API!')
    try {
        const users = await User.find(); // Fetch all users from MongoDB
        res.status(200).json(users); // Respond with the user data
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Route to fetch a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Find user by ID
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user); // Respond with the user data
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});

// Route to create a new user
router.post('/users', async (req, res) => {
    
    try {
        const { firstName, lastName, phoneNumber, email, password } = req.body;
        const newUser = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password, // Remember to hash this password in a real app!
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
});


// Route to delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); // Find and delete user by ID
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' }); // Respond with a success message
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});
// Route to login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); // Find user by email

        if (!user) {
            return res.status(404).json({ error: 'Invalid Email (Please register)' });
        }

        const isMatch = user.password === password; // Compare password as plain strings
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Password' });
        }

        // Assuming you have a method to generate a token
        // const token = user.generateAuthToken();
        // // Method to generate an auth token
        // UserSchema.methods.generateAuthToken = function() {
        //     const token = jwt.sign({ _id: this._id, email: this.email }, 'your_jwt_secret_key', { expiresIn: '1h' });
        //     return token;
        // };

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error); // Log the error details
        res.status(500).json({ error: 'An unexpected error occurred while logging in. Please try again later.' });
    }
});

module.exports = router;
