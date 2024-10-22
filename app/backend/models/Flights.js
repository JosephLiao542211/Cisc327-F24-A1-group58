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
    seatConfiguration: {
        type: Map,
        of: Number, // Example: { 'economy': 150, 'business': 50, 'firstClass': 10 }
        required: true
    },
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlightStatus',
        required: true
    },

});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;