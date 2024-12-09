const { client } = require('../config/database');
const { ObjectId } = require('mongodb');

const treePhotoCollection = client.db('Cluster0').collection('treePhotos');

const TreePhoto = {
  // Create a new tree photo
  create: async (data) => {
    // Validate ObjectId references
    const registrationId = ObjectId.isValid(data.registration_id) ? new ObjectId(data.registration_id) : null;
    const userId = ObjectId.isValid(data.user_id) ? new ObjectId(data.user_id) : null;
    const eventId = ObjectId.isValid(data.event_id) ? new ObjectId(data.event_id) : null;

    if (!registrationId || !userId || !eventId) {
      throw new Error('Invalid registration_id, user_id, or event_id');
    }

    // Add default properties
    const treePhotoData = {
      ...data,
      registration_id: registrationId,
      user_id: userId,
      event_id: eventId,
      is_valid: false,
      uploaded_at: new Date().toISOString(),
    };

    // Insert the tree photo
    const result = await treePhotoCollection.insertOne(treePhotoData);
    return {
      _id: result.insertedId,
      ...treePhotoData,
    };
  },

  // Find tree photo by ID
  findById: async (id) => {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid photo ID');
    }

    const treePhoto = await treePhotoCollection.findOne({ _id: new ObjectId(id) });
    if (!treePhoto) {
      throw new Error('Tree photo not found');
    }

    return treePhoto;
  },

  // Update tree photo by ID
  updateById: async (id, updateData) => {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid photo ID');
    }

    const result = await treePhotoCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      throw new Error('Tree photo not found');
    }

    return result.value;
  },

  // Delete tree photo by ID
  deleteById: async (id) => {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid photo ID');
    }

    const result = await treePhotoCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error('Tree photo not found');
    }

    return true;
  },

  // Find all tree photos
  findAll: async () => {
    return await treePhotoCollection.find().toArray();
  },
};

module.exports = TreePhoto;