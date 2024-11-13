const express = require('express');
const Plane = require('../models/Planes');
const mongoose = require('mongoose');

const router = express.Router();

// Get all planes
router.get('/planes', async (req, res) => {
    try {
        const planes = await Plane.find();
        res.json(planes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all plane IDs
router.get('/planes/ids', async (req, res) => {
    try {
        const planes = await Plane.find().select('planeId');
        const planeIds = planes.map(plane => plane.planeId);
        res.json(planeIds);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a plane by MongoDB ObjectId
router.get('/planes/:id', getPlaneById, (req, res) => {
    res.json(res.plane);
});

// Get one plane by custom planeId field
router.get('/plane/planeId/:planeId', async (req, res) => {
    try {
        const plane = await Plane.findOne({ planeId: Number(req.params.planeId) });
        if (!plane) {
            return res.status(404).json({ message: 'Cannot find plane' });
        }
        res.json(plane);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a plane
router.post('/planes', async (req, res) => {
    const plane = new Plane({
        planeId: req.body.planeId,
        modelNumber: req.body.modelNumber,
        model: req.body.model,
        rows: req.body.rows,
        columns: req.body.columns,
        firstclassRange: req.body.firstclassRange
    });

    try {
        const newPlane = await plane.save();
        res.status(201).json(newPlane);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a plane
router.patch('/planes/:id', getPlaneById, async (req, res) => {
    const { planeId, modelNumber, model, rows, columns, firstclassRange } = req.body;
    if (planeId !== undefined) res.plane.planeId = planeId;
    if (modelNumber !== undefined) res.plane.modelNumber = modelNumber;
    if (model !== undefined) res.plane.model = model;
    if (rows !== undefined) res.plane.rows = rows;
    if (columns !== undefined) res.plane.columns = columns;
    if (firstclassRange !== undefined) res.plane.firstclassRange = firstclassRange;

    try {
        const updatedPlane = await res.plane.save();
        res.json(updatedPlane);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a plane
router.delete('/planes/:id', getPlaneById, async (req, res) => {
    try {
        await res.plane.remove();
        res.json({ message: 'Deleted Plane' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get plane by MongoDB ObjectId
async function getPlaneById(req, res, next) {
    let plane;
    try {
        plane = await Plane.findById(req.params.id);
        if (!plane) {
            return res.status(404).json({ message: 'Cannot find plane' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.plane = plane;
    next();
}

module.exports = router;
