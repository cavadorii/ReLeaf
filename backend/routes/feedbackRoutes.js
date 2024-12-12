const express = require('express');
const feedbackController = require('../controllers/feedbackController');

const router = express.Router();

router.post('/feedback', feedbackController.writeEventFeedback);
router.get('/feedback/:id', feedbackController.getEventFeedbackById);
router.get(`/feedbacks`, feedbackController.getAllEventFeedbacks);
router.get('/averageRating', feedbackController.getAverageEventRating);

module.exports = router;