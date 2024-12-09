const TreePhoto = require('../models/three_photo');
const { predictTreePresence } = require('./predictController');
const path = require('path');

const TreePhotoController = {
  // Create a new tree photo with validation
  async createTreePhoto(req, res) {
    try {
      console.log('File:', req.file); // Debug uploaded file
      console.log('Body:', req.body); // Debug form data

      // Ensure the required fields exist
      const { registration_id, user_id, event_id } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: 'Photo is required' });
      }

      if (!registration_id || !user_id || !event_id) {
        return res.status(400).json({
          error: 'registration_id, user_id, and event_id are required',
        });
      }

      // Predict tree presence in the uploaded file
      const filePath = req.file.path; // Path to the uploaded file
      const hasTree = await predictTreePresence(filePath);
      if (!hasTree) {
        return res
          .status(400)
          .json({ error: 'The image does not contain a valid tree.' });
      }

      // Create the tree photo in the database
      const treePhoto = await TreePhoto.create({
        registration_id,
        user_id,
        event_id,
        photo_url: filePath, // Store the file path
        is_valid: true,
      });

      res.status(201).json(treePhoto);
    } catch (error) {
      console.error('Error creating tree photo:', error.message);
      res.status(400).json({ error: error.message });
    }
  },
  // Get a tree photo by ID
  async getTreePhotoById(req, res) {
    try {
      const treePhoto = await TreePhoto.findById(req.params.id);
      res.status(200).json(treePhoto);
    } catch (error) {
      console.error('Error fetching tree photo:', error.message);
      res.status(400).json({ error: error.message });
    }
  },

  // Update a tree photo by ID
  async updateTreePhotoById(req, res) {
    try {
      const treePhoto = await TreePhoto.updateById(req.params.id, req.body);
      res.status(200).json(treePhoto);
    } catch (error) {
      console.error('Error updating tree photo:', error.message);
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a tree photo by ID
  async deleteTreePhotoById(req, res) {
    try {
      const isDeleted = await TreePhoto.deleteById(req.params.id);
      res.status(200).json({ message: 'Tree photo deleted successfully' });
    } catch (error) {
      console.error('Error deleting tree photo:', error.message);
      res.status(400).json({ error: error.message });
    }
  },

  // Get all tree photos
  async getAllTreePhotos(req, res) {
    try {
      const treePhotos = await TreePhoto.findAll();
      res.status(200).json(treePhotos);
    } catch (error) {
      console.error('Error fetching tree photos:', error.message);
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = TreePhotoController;
