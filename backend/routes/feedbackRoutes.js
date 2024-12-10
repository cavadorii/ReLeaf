const express = require('express');
const feedbackController = require('../controllers/feedbackController');

const router = express.Router();

router.post('/feedback', feedbackController.writeFeedback);
router.get('/feedback/${eventId}', feedbackController.getEventFeedbackById(eventId));

module.exports = router;