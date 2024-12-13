const express = require('express');
const upload = require('../middleware/multer'); // Adjust path
const TreePhotoSchemaController = require('../controllers/treePhotoSchemaController');

const router = express.Router();

// Create a new tree photo with image upload
router.post(
  '/',
  upload.single('photo'), // Multer middleware processes 'photo'
  TreePhotoSchemaController.createTreePhoto // Controller handles the request
);

module.exports = router;

// Get a tree photo by ID
router.get('/:id', async (req, res) => {
  console.log('Route parameter:', req.params); // Log the entire params object
  try {
    await TreePhotoSchemaController.getTreePhotoById(req, res);
  } catch (error) {
    console.error('Error in route handler:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a tree photo by ID
router.put('/:id', async (req, res) => {
  try {
    await TreePhotoSchemaController.updateTreePhotoById(req, res); // Pass req and res correctly
  } catch (error) {
    console.error('Error updating tree photo:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Delete a tree photo by ID
router.delete('/:id', async (req, res) => {
  try {
    await TreePhotoSchemaController.deleteTreePhotoById(req, res); // Pass req and res
  } catch (error) {
    console.error('Error in delete route:', error.message);
    res.status(500).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    // Properly forward req and res to the controller
    await TreePhotoSchemaController.getAllTreePhotos(req, res);
  } catch (error) {
    console.error('Error fetching tree photos:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get tree photos by user ID
router.get('/user/:user_id', async (req, res) => {
  try {
    await TreePhotoSchemaController.getTreePhotosByUserId(req, res); // Pass req and res
  } catch (error) {
    console.error('Error fetching tree photos by user ID:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;