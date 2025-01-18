const express = require('express');
const {
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  getAllUsersController,
  getUserNameByIdController,
  awardPointsController
} = require('../controllers/usersController');

const router = express.Router();

// Create a new user
router.post('/', createUserController);

// Get all users
router.get('/', getAllUsersController);

// Get user by ID
router.get('/:id', getUserByIdController);

// Update user by ID
router.put('/:id', updateUserController);

// Delete user by ID
router.delete('/:id', deleteUserController);

router.get('/username/:id', getUserNameByIdController);

router.post('/award-points', awardPointsController);



module.exports = router;