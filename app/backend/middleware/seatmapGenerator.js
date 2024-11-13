const axios = require('axios'); // Make sure axios is installed
const mongoose = require('mongoose');
const seatSchema = new mongoose.Schema({
    booked: { type: Boolean, default: false },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    class: { type: String, required: true },
});

// Assuming seatMapSchema or some parent schema uses seatSchema for each seat entry
async function fetchPlaneConfiguration(planeId) {
    try {
        const response = await axios.get(`http://localhost:5000/api/plane/planeId/${planeId}`);
        return response.data; // Assuming the response contains { rows, aisles, firstclassRange } properties
    } catch (error) {
        throw new Error('Failed to fetch plane configuration');
    }
}

async function generateSeatMap(planeId) {
    const config = await fetchPlaneConfiguration(planeId);

    if (!config) {
        throw new Error('Invalid plane configuration');
    }

    const seatMap = new Map();
    const rows = config.rows;
    const aisles = config.columns;
    const [firstClassStart, firstClassEnd] = config.firstclassRange;

    for (let row = 1; row <= rows; row++) {
        for (let aisle = 0; aisle < aisles; aisle++) {
            const seatLetter = String.fromCharCode(65 + aisle); // Convert 0 -> 'A', 1 -> 'B', etc.
            const seatKey = `${row}${seatLetter}`;
            seatMap.set(seatKey, {
                booked: false,
                bookedBy: null,
                class: (row >= firstClassStart && row <= firstClassEnd) ? 'first' : 'economy',
            });
        }
    }

    return Object.fromEntries(seatMap); // Convert Map to an object for MongoDB compatibility
}

module.exports = generateSeatMap;

// Example usage
// generateSeatMap('plane1').then(seatMap => console.log(seatMap)).catch(err => console.error(err));
