const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure the path is correct

// Route to fetch all users
router.get('/users', async (req, res) => {
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
    const { name } = req.body; // Extract name from the request body

    if (!name) {
        return res.status(400).json({ error: 'Name is required' }); // Check if name is provided
    }

    const newUser = new User({
        name: name, // Create a new user with the provided name
    });

    try {
        const savedUser = await newUser.save(); // Save the new user in MongoDB
        res.status(201).json(savedUser); // Respond with the saved user
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
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

module.exports = router;
