const express = require('express');
const eventController = require('../controllers/eventController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', authenticateToken, eventController.deleteEvent);
router.get('/:id/volunteers', eventController.getEventVolunteers);



module.exports = router;
