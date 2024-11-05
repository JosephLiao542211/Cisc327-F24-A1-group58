const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const seatSchema = new Schema({
    booked: { type: Boolean, default: false },
    bookedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    price: { type: Number, required: true }
});

const seatMapSchema = new Schema({
    totalSeats: { type: Number, required: true },
    econClassSeats: { type: Number, required: true },
    econClassPrice: { type: Number, required: true },
    firstClassSeats: { type: Number, required: true },
    firstClassPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    seats: { type: Map, of: seatSchema, required: true }
});

const SeatMap = mongoose.model('SeatMap', seatMapSchema);

module.exports = SeatMap;