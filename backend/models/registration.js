const { client } = require('../config/database');
const { ObjectId } = require('mongodb');

const registrationCollection = client.db('Cluster0').collection('registrations');

const registration = {
  create: async (data) => {
    const eventId = ObjectId.isValid(data.event_id) ? new ObjectId(data.event_id) : null;
    const userId = ObjectId.isValid(data.user_id) ? new ObjectId(data.user_id) : null;

    if (!eventId || !userId) {
      throw new Error('Invalid event_id or user_id');
    }

    const registrationData = {
      ...data,
      event_id: eventId,
      user_id: userId,
      status: data.status || 'pending',
      registered_at: new Date(),
      points_awarded: data.points_awarded || 0,
    };

    const result = await registrationCollection.insertOne(registrationData);
    return {
      _id: result.insertedId,
      ...registrationData,
    };
  },

  findById: async (id) => {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid registration ID');
    }

    const registration = await registrationCollection.findOne({ _id: new ObjectId(id) });
    if (!registration) {
      throw new Error('Registration not found');
    }

    return registration;
  },

  findByUserId: async (userId) => {
    if (!ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }

    const registrations = await registrationCollection.find({ user_id: new ObjectId(userId) }).toArray();
    if (registrations.length === 0) {
      throw new Error('No registrations found for the user');
    }

    return registrations;
  },

  findByEventId: async (eventId) => {
    if (!ObjectId.isValid(eventId)) {
      throw new Error('Invalid event ID');
    }

    const registrations = await registrationCollection.find({ event_id: new ObjectId(eventId) }).toArray();
    if (registrations.length === 0) {
      throw new Error('No registrations found for the event');
    }

    return registrations;
  },

  updateById: async (id, updateData) => {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid registration ID');
    }
  
    const result = await registrationCollection.updateOne(
      { _id: new ObjectId(id) }, 
      { $set: updateData } 
    );
  
    if (result.matchedCount === 0) {
      throw new Error('Registration not found'); 
    }
  
    const updatedRegistration = await registrationCollection.findOne({ _id: new ObjectId(id) });
  
    return updatedRegistration;
  },

  findAll: async () => {
    try {
      const registrations = await registrationCollection.find().toArray();
      return registrations;
    } catch (error) {
      console.error('Error fetching registrations:', error.message);
      throw new Error('Failed to fetch registrations');
    }
  },

  deleteById: async (id) => {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid registration ID');
    }

    const result = await registrationCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error('Registration not found');
    }

    return true;
  },
};

module.exports = registration;