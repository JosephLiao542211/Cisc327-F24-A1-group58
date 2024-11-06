require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/UserRoute');
const flightRoutes = require('./routes/FlightRoute');
const planeRoutes = require('./routes/PlaneRoute');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB using the URI from .env
mongoose
    .connect(process.env.MONGO_URI) // Use MONGO_URI here
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/api', planeRoutes);
app.use('/api', userRoutes);
app.use('/api', flightRoutes);

// Route for user registration
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the User Registration API!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
