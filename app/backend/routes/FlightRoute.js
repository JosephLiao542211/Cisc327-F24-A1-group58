const express = require('express');
const mongoose = require('mongoose');
const Flight = require('../models/Flights'); // Adjust the path as necessary

const router = express.Router();

// Get all flights
router.get('/flight', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific flight by ID
router.get('/flight/:id', getFlight, (req, res) => {
    res.json(res.flight);
});

// Create a new flight
router.post('/flight', async (req, res) => {
    const flight = new Flight({
        flightNumber: req.body.flightNumber,
        airline: req.body.airline,
        departureAirport: req.body.departureAirport,
        arrivalAirport: req.body.arrivalAirport,
        departureTime: req.body.departureTime,
        arrivalTime: req.body.arrivalTime,
        price: req.body.price,
        seatConfiguration: req.body.seatConfiguration,
        statusId: new mongoose.Types.ObjectId()
    });

    try {
        const newFlight = await flight.save();
        res.status(201).json(newFlight);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a flight by ID
router.patch('/flight/:id', getFlight, async (req, res) => {
    if (req.body.flightNumber != null) {
        res.flight.flightNumber = req.body.flightNumber;
    }
    if (req.body.airline != null) {
        res.flight.airline = req.body.airline;
    }
    if (req.body.departureAirport != null) {
        res.flight.departureAirport = req.body.departureAirport;
    }
    if (req.body.arrivalAirport != null) {
        res.flight.arrivalAirport = req.body.arrivalAirport;
    }
    if (req.body.departureTime != null) {
        res.flight.departureTime = req.body.departureTime;
    }
    if (req.body.arrivalTime != null) {
        res.flight.arrivalTime = req.body.arrivalTime;
    }
    if (req.body.price != null) {
        res.flight.price = req.body.price;
    }
    if (req.body.seatConfiguration != null) {
        res.flight.seatConfiguration = req.body.seatConfiguration;
    }
    if (req.body.statusId != null) {
        res.flight.statusId = req.body.statusId;
    }

    try {
        const updatedFlight = await res.flight.save();
        res.json(updatedFlight);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a flight by ID
router.delete('/flight/:id', getFlight, async (req, res) => {
    try {
        await res.flight.remove();
        res.json({ message: 'Deleted Flight' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Bulk insert flights
router.post('/flight/bulk', async (req, res) => {
    const flightsData = req.body; // Expecting an array of flight objects

    if (!Array.isArray(flightsData) || flightsData.length === 0) {
        return res.status(400).json({ message: 'Invalid input data. Expected an array of flight objects.' });
    }

    // Map the incoming data to Flight models
    const flights = flightsData.map(flightData => ({
        flightNumber: flightData.flightNumber,
        airline: flightData.airline,
        departureAirport: flightData.departureAirport,
        arrivalAirport: flightData.arrivalAirport,
        departureTime: flightData.departureTime,
        arrivalTime: flightData.arrivalTime,
        price: flightData.price,
        seatConfiguration: flightData.seatConfiguration,
        statusId: new mongoose.Types.ObjectId()
    }));

    try {
        const newFlights = await Flight.insertMany(flights);
        res.status(201).json(newFlights);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Middleware to get flight by ID
async function getFlight(req, res, next) {
    let flight;
    try {
        flight = await Flight.findById(req.params.id);
        if (flight == null) {
            return res.status(404).json({ message: 'Cannot find flight' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.flight = flight;
    next();
}

module.exports = router;