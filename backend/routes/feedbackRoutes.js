const express = require('express');
const feedbackController = require('../controllers/feedbackController');

const router = express.Router();

router.post('/feedback', feedbackController.writeEventFeedback);
router.get(`/feedback`, feedbackController.getAllEventFeedbacks);

module.exports = router;