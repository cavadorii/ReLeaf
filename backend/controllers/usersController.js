const User = require('../models/User');

// Create a new user
async function createUserController(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get user by ID
async function getUserByIdController(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update user by ID
async function updateUserController(req, res) {
    try {
      console.log('ID received:', req.params.id); // Log the received ID
      const user = await User.updateById(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error.message);
      res.status(400).json({ error: error.message });
    }
  }

// Delete user by ID
async function deleteUserController(req, res) {
  try {
    const isDeleted = await User.deleteById(req.params.id);
    if (!isDeleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all users
async function getAllUsersController(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getUserNameByIdController(req, res) {
  try {
    const username = await User.findById(req.params.id); // This returns username directly
    if (!username) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ username: username.username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Award points to a user
async function awardPointsController(req, res) {
  try {
    const { userId } = req.body; // User ID
    const { points } = req.body; // Points to be awarded

    // Ensure points are valid
    if (typeof points !== "number" || points <= 0) {
      return res.status(400).json({ error: "Invalid points value." });
    }

    // Find and update the user
    const user = await User.updatePointsById(userId, points);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: `Successfully awarded ${points} points.`,
      user,
    });
  } catch (error) {
    console.error("Error awarding points:", error.message);
    res.status(500).json({ error: "An error occurred while awarding points." });
  }
}

module.exports = {
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  getAllUsersController,
  getUserNameByIdController,
  awardPointsController
};