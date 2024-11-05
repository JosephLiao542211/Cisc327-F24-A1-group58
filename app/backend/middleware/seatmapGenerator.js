


const planeConfigurations = {
    'plane1': { rows: 30, aisles: 6, range: [10, 30] },
    'plane2': { rows: 20, aisles: 4, range: [0, 20] },
    // Add more plane configurations as needed
};

function generateSeatMap(planeId) {
    const config = planeConfigurations[planeId];
    if (!config) {
        throw new Error('Invalid plane ID');
    }

    const seatMap = {};
    const rows = config.rows;
    const firstclassrange = config.range;
    const aisles = config.aisles;

    for (let row = 0; row <= rows; row++) {
        for (let aisle = 0; aisle < aisles; aisle++) {
            const seatLetter = String.fromCharCode(65 + aisle); // Convert 0 -> 'A', 1 -> 'B', etc.
            const seatKey = `${row}${seatLetter}`;
            seatMap[seatKey] = {
                booked: false,
                bookedBy: null,
                class: (row >= firstclassrange[0] && row <= firstclassrange[1]) ? 'first' : 'economy'
            };
        }
    }

    return seatMap;
}

module.exports = generateSeatMap;

// Example usage of generateSeatMap function

