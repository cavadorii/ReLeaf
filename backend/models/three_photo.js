const { client } = require('../config/database');
const { ObjectId } = require('mongodb');

const treePhotoCollection = client.db('Cluster0').collection('treePhotos');

const TreePhoto = {
  // Create a new tree photo
  create: async (data) => {
    const registrationId = ObjectId.isValid(data.registration_id) ? new ObjectId(data.registration_id) : null;
    const userId = ObjectId.isValid(data.user_id) ? new ObjectId(data.user_id) : null;
    const eventId = ObjectId.isValid(data.event_id) ? new ObjectId(data.event_id) : null;

    if (!registrationId || !userId || !eventId) {
      throw new Error('Invalid registration_id, user_id, or event_id');
    }

    const treePhotoData = {
      ...data,
      registration_id: registrationId,
      user_id: userId,
      event_id: eventId,
      is_valid: data.is_valid || false,
      uploaded_at: new Date().toISOString(),
    };

    const result = await treePhotoCollection.insertOne(treePhotoData);

    return {
      _id: result.insertedId,
      ...treePhotoData,
    };
  },

  // Find a tree photo by ID
  findById: async (id) => {
    console.log('findById called with ID:', id); // Debug the input ID
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid photo ID');
    }
  
    const treePhoto = await treePhotoCollection.findOne({ _id: new ObjectId(id) });
    console.log('Database result for ID:', treePhoto); // Debug the database result
  
    if (!treePhoto) {
      throw new Error('Tree photo not found');
    }
  
    return treePhoto;
  },
  

  // Update a tree photo by ID
  updateById: async (id, updateData) => {
    console.log('updateById called with ID:', id, 'and data:', updateData); // Debug inputs

    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid photo ID');
    }

    if (!updateData || typeof updateData !== 'object' || Object.keys(updateData).length === 0) {
      throw new Error('No valid update data provided');
    }

    const result = await treePhotoCollection.updateOne(
      { _id: new ObjectId(id) }, // Match the photo by ID
      { $set: updateData } // Update the specified fields
    );

    console.log('Update operation result:', result); // Debug the update result

    if (result.matchedCount === 0) {
      throw new Error('Tree photo not found');
    }

    // Fetch and return the updated document
    const updatedTreePhoto = await treePhotoCollection.findOne({ _id: new ObjectId(id) });
    return updatedTreePhoto;
  },

  // Delete a tree photo by ID
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
    try {
      // Retrieve all tree photos from the collection
      const treePhotos = await treePhotoCollection.find().toArray();
      return treePhotos;
    } catch (error) {
      console.error('Error fetching tree photos from database:', error.message);
      throw new Error('Database fetch failed');
    }
  },

  // Find tree photos by user ID
  findByUserId: async (userId) => {
    if (!ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }

    const treePhotos = await treePhotoCollection.find({ user_id: new ObjectId(userId) }).toArray();
    if (treePhotos.length === 0) {
      throw new Error('No tree photos found for the user');
    }

    return treePhotos;
  },

  // Find tree photos by event ID
  findByEventId: async (eventId) => {
    if (!ObjectId.isValid(eventId)) {
      throw new Error('Invalid event ID');
    }

    const treePhotos = await treePhotoCollection.find({ event_id: new ObjectId(eventId) }).toArray();
    if (treePhotos.length === 0) {
      throw new Error('No tree photos found for the event');
    }

    return treePhotos;
  },
};

module.exports = TreePhoto;