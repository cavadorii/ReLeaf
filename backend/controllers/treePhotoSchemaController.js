const TreePhoto = require('../models/three_photo');
const { predictTreePresence } = require('./predictController');
const { ObjectId } = require('mongodb');

const TreePhotoController = {
  // Create a new tree photo with validation
  async createTreePhoto(req, res) {
    try {
      console.log('File:', req.file); // Debug uploaded file
      console.log('Body:', req.body); // Debug form data

      const { registration_id, user_id, event_id, latitude, longitude } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: 'Photo is required' });
      }

      if (!registration_id || !user_id || !event_id || !latitude || !longitude) {
        return res
          .status(400)
          .json({ error: 'registration_id, user_id, event_id, latitude, and longitude are required' });
      }

      // Predict tree presence in the uploaded file
      const filePath = req.file.path;
      const hasTree = await predictTreePresence(filePath);
      if (!hasTree) {
        return res.status(400).json({ error: 'The image does not contain a valid tree.' });
      }

      // Create the tree photo in the database
      const treePhoto = await TreePhoto.create({
        registration_id,
        user_id,
        event_id,
        photo_url: filePath,
        latitude: parseFloat(latitude), // Convert to float
        longitude: parseFloat(longitude), // Convert to float
        is_valid: true,
      });

      res.status(201).json({ message: 'Tree photo created successfully', data: treePhoto });
    } catch (error) {
      console.error('Error creating tree photo:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  // Get a tree photo by ID
  async getTreePhotoById(req, res) {
    try {
      console.log('Request Params:', req.params); // Log the params object
      const { id } = req.params;
      console.log('Extracted ID:', id); // Log the extracted ID

      if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid or missing photo ID' });
      }

      const treePhoto = await TreePhoto.findById(id);

      console.log('Fetched Tree Photo:', treePhoto); // Log the fetched photo

      if (!treePhoto) {
        return res.status(404).json({ message: 'Tree photo not found' });
      }

      res.status(200).json({ data: treePhoto });
    } catch (error) {
      console.error('Error in controller:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  // Update a tree photo by ID
  async updateTreePhotoById(req, res) {
    try {
      console.log('Request Params:', req.params); // Log the params object
      console.log('Request Body:', req.body); // Log the body object

      const { id } = req.params;
      console.log('Extracted ID:', id); // Log the extracted ID

      if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid or missing photo ID' });
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'No update data provided' });
      }

      const updatedTreePhoto = await TreePhoto.updateById(id, req.body);

      console.log('Updated Tree Photo:', updatedTreePhoto); // Log the updated photo

      if (!updatedTreePhoto) {
        return res.status(404).json({ message: 'Tree photo not found' });
      }

      res.status(200).json({ message: 'Tree photo updated successfully', data: updatedTreePhoto });
    } catch (error) {
      console.error('Error updating tree photo:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a tree photo by ID
  async deleteTreePhotoById(req, res) {
    try {
      console.log('Request Params:', req.params); // Log the params object

      const { id } = req.params;
      console.log('Extracted ID:', id); // Log the extracted ID

      if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid or missing photo ID' });
      }

      const isDeleted = await TreePhoto.deleteById(id);
      console.log('Delete Result:', isDeleted); // Log the delete result

      if (!isDeleted) {
        return res.status(404).json({ message: 'Tree photo not found' });
      }

      res.status(200).json({ message: 'Tree photo deleted successfully' });
    } catch (error) {
      console.error('Error deleting tree photo:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  // Get all tree photos
  async getAllTreePhotos(req, res) {
    try {
      // Fetch all tree photos
      const treePhotos = await TreePhoto.findAll();

      // Handle empty array
      if (!treePhotos || treePhotos.length === 0) {
        return res.status(200).json({ data: [], message: 'No tree photos found' });
      }

      // Return the fetched tree photos
      res.status(200).json({ data: treePhotos });
    } catch (error) {
      console.error('Error fetching tree photos:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  // Get tree photos by user ID
async getTreePhotosByUserId(req, res) {
  try {
    console.log('Request Params:', req.params); // Log the params object
    const { user_id } = req.params;
    console.log('Extracted User ID:', user_id); // Log the extracted user ID

    if (!user_id || !ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: 'Invalid or missing user ID' });
    }

    const treePhotos = await TreePhoto.findByUserId(user_id);

    console.log('Fetched Tree Photos:', treePhotos); // Log the fetched tree photos

    if (!treePhotos || treePhotos.length === 0) {
      return res.status(404).json({ message: 'No tree photos found for this user' });
    }

    res.status(200).json({ data: treePhotos });
  } catch (error) {
    console.error('Error fetching tree photos by user ID:', error.message);
    res.status(500).json({ error: error.message });
  }
}

};

module.exports = TreePhotoController;
