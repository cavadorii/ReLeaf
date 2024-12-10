const { client } = require('../config/database');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

const userCollection = client.db('Cluster0').collection('users');

const User = {
  create: async (user) => {
    const existingUser = await userCollection.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });
    if (existingUser) {
      throw new Error('Email or username already exists');
    }

    user.password = await bcrypt.hash(user.password, 10);
    user.points = 0;
    user.created_at = new Date().toISOString();

    const result = await userCollection.insertOne({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role || 'volunteer',
      points: user.points,
      created_at: user.created_at,
    });

    return {
      _id: result.insertedId,
      username: user.username,
      email: user.email,
      role: user.role || 'volunteer',
      points: user.points,
      created_at: user.created_at,
    };
  },

  findById: async (id) => {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }

    const user = await userCollection.findOne({ _id: new ObjectId(id) });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  updateById: async (id, data) => {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const result = await userCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

    if (result.matchedCount === 0) {
      throw new Error('User not found');
    }

    // Fetch the updated user
    const updatedUser = await userCollection.findOne({ _id: new ObjectId(id) });
    return updatedUser;
  },

  deleteById: async (id) => {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }

    const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error('User not found');
    }
    return true;
  },

  findAll: async () => {
    return await userCollection.find().toArray();
  },

  findByUsername: async (username) => {
    const user = await userCollection.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  findByEmail: async (email) => {
    const user = await userCollection.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
};

module.exports = User;
