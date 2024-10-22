// server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoute');
const flightRoutes = require('./routes/FlightRoute');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Log the MongoDB URI to confirm it's being read correctly
console.log('MongoDB URI:', process.env.MONGO_URI);

// Connect to MongoDB using the URI from .env
mongoose
    .connect(process.env.MONGO_URI) // Use MONGO_URI here
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/api', userRoutes);
app.use('/api', flightRoutes);
// Route for user registration
app.get('/', (req, res) => {
    res.send('Welcome to the User Registration API!');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
