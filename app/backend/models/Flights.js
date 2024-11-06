const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    booked: { type: Boolean, default: false },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    class: { type: String, required: true },
});

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
    economyPrice: {
        type: Number, // Price in the relevant currency
        required: true
    },
    firstclassPrice: {
        type: Number, // Price in the relevant currency
        required: true
    },

    planeID: {
        type: String, // Price in the relevant currency
        required: true
    },

    discount: {
        type: Number, // Discount as a percentage
        required: false,
        min: 0,
        max: 100
    },

    seatMap: { 
        type: Map, 
        of: seatSchema, 
        required: true },
    
        // seats: {
        //     '1A': { seatNumber: '1A', class: 'Business', isAvailable: true },
        //     '1B': { seatNumber: '1B', class: 'Business', isAvailable: false },
        //     // Add more seats as needed
        // }
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlightStatus',
        required: true
    }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;