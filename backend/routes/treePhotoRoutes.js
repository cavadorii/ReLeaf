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
  try {
    const treePhoto = await TreePhotoSchemaController.getTreePhotoById(req.params.id);
    res.status(200).json(treePhoto);
  } catch (error) {
    console.error('Error fetching tree photo:', error);
    res.status(404).json({ error: error.message });
  }
});

// Update a tree photo by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTreePhoto = await TreePhotoSchemaController.updateTreePhotoById(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedTreePhoto);
  } catch (error) {
    console.error('Error updating tree photo:', error);
    res.status(400).json({ error: error.message });
  }
});

// Delete a tree photo by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTreePhoto = await TreePhotoSchemaController.deleteTreePhotoById(
      req.params.id
    );
    res.status(200).json(deletedTreePhoto);
  } catch (error) {
    console.error('Error deleting tree photo:', error);
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;