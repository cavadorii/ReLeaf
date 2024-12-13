const { client } = require('../config/database');

const leaderboardCollection = client.db('Cluster0').collection('leaderboard');

const Leaderboard = {
  // Create a new leaderboard entry
  create: async (entry) => {
    entry.points = entry.points || 0; // Default to 0 if not provided
    entry.created_at = new Date().toISOString(); // Add a timestamp
    const result = await leaderboardCollection.insertOne(entry);
    return result;
  },

  // Find a leaderboard entry by ID
  findById: async (entryId) => {
    const ObjectId = require('mongodb').ObjectId;
    return await leaderboardCollection.findOne({ _id: new ObjectId(entryId) });
  },

  // Update a leaderboard entry by ID
  updateById: async (entryId, updateData) => {
    const ObjectId = require('mongodb').ObjectId;
    const result = await leaderboardCollection.updateOne(
      { _id: new ObjectId(entryId) },
      { $set: updateData },
      { upsert: false }
    );
    return result;
  },

  // Delete a leaderboard entry by ID
  deleteById: async (entryId) => {
    const ObjectId = require('mongodb').ObjectId;
    const result = await leaderboardCollection.deleteOne({ _id: new ObjectId(entryId) });
    return result;
  },

  // Find all leaderboard entries for a specific event
  findByEventId: async (eventId) => {
    const ObjectId = require('mongodb').ObjectId;
    return await leaderboardCollection
      .find({ event_id: new ObjectId(eventId) })
      .sort({ points: -1}) // Sort by points descending
      .toArray();
  },

  findAll:async()=>{
    const ObjectId=require('mongodb').ObjectId;
    return await leaderboardCollection.find().toArray();
  },
};

module.exports = Leaderboard;
