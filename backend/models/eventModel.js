const { client } = require('../config/database');

const eventsCollection = client.db('Cluster0').collection('events');

const Event = {
  create: async (eventData) => {
    eventData.created_at = new Date().toISOString();
    const result = await eventsCollection.insertOne(eventData);
    return result.insertedId;
  },

  findAll: async () => {
    return await eventsCollection.find({}).toArray();
  },

  findById: async (id) => {
    const { ObjectId } = require('mongodb');
    return await eventsCollection.findOne({ _id: new ObjectId(id) });
  },

  updateById: async (id, updatedData) => {
    const { ObjectId } = require('mongodb');
    updatedData.updated_at = new Date().toISOString();
    const result = await eventsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
    return result.modifiedCount;
  },

  deleteById: async (id) => {
    const { ObjectId } = require('mongodb');
    const result = await eventsCollection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
  }
};

module.exports = Event;
