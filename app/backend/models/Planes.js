const mongoose = require('mongoose');

const planeSchema = new mongoose.Schema({
    planeId: {
        type: Number,
        required: true,
        unique: true,
      
    },
    modelNumber: {
        type: Number,
        required: true
    },
    model: {
        type: String,
        required: true,
        enum: ['Boeing', 'Airbus', 'Embraer', 'Bombardier', 'Cessna']
    },
    rows: {
        type: Number,
        required: true
    },
    columns: {
        type: Number,
        required: true
    },
    firstclassRange: {
        type: [Number],
        required: true
    },
});

const Plane = mongoose.model('Plane', planeSchema);

module.exports = Plane;