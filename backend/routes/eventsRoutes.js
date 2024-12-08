const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Create an event
router.post('/createevent', eventController.createEvent);

// Get all events
router.get('/getallevents', eventController.getAllEvents);

// Get an event by ID
router.get('/:id', eventController.getEventById);

// Update an event by ID
router.put('/:id', eventController.updateEvent);

// Delete an event by ID
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
