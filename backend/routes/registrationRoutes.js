const express = require('express');
const registrationController = require('../controllers/registrationController'); // Adjust the path as needed

const router = express.Router();

router.post('/', registrationController.create); // Create a registration
router.get('/', registrationController.getAll);
router.get('/:id', registrationController.getById); // Get a registration by ID
router.get('/user/:userId', registrationController.getByUserId); // Get registrations by user ID
router.get('/event/:eventId', registrationController.getByEventId); // Get registrations by event ID
router.put('/:id', registrationController.update); // Update a registration by ID
router.delete('/:id', registrationController.delete); // Delete a registration by ID

module.exports = router;