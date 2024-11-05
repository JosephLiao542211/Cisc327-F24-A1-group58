const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
        unique: true
    },
    airline: {
        type: String,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    price: {
        type: Number, // Price in the relevant currency
        required: true
    },
    seatsAvailable: {
        type: Number, // Number of seats available
        required: true
    },
    discount: {
        type: Number, // Discount as a percentage
        required: false,
        min: 0,
        max: 100
    },
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlightStatus',
        required: true
    }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;