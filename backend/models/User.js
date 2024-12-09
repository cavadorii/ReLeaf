const { client } = require('../config/database');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

const userCollection = client.db('Cluster0').collection('users');

const User = {
  // Create a new user
  create: async (user) => {
    // Check if email or username already exists
    const existingUser = await userCollection.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });
    if (existingUser) {
      throw new Error('Email or username already exists');
    }
  
    // Hash the password
    user.password = await bcrypt.hash(user.password, 10);
  
    // Set default properties
    user.points = 0;
    user.created_at = new Date().toISOString();
  
    // Insert the user into the collection
    const result = await userCollection.insertOne({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role || 'volunteer', // Default role if not provided
      points: user.points,
      created_at: user.created_at,
    });
  
    // Return the inserted document with the ID
    return {
      _id: result.insertedId, // Get the inserted document ID
      username: user.username,
      email: user.email,
      role: user.role || 'volunteer',
      points: user.points,
      created_at: user.created_at,
    };
  },

  // Find user by ID
  findById: async (id) => {
    // Validate the ObjectId
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }

    // Fetch the user
    const user = await userCollection.findOne({ _id: new ObjectId(id) });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  // Update user by ID
  updateById: async (id, data) => {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }
  
    // Convert id to ObjectId
    const objectId = new ObjectId(id);
  
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
  
    const result = await userCollection.findOneAndUpdate(
      { _id: objectId }, // Use the converted ObjectId
      { $set: data },
      { returnDocument: 'after' }
    );
  
    if (!result.value) {
      throw new Error('User not found');
    }
  
    return result.value;
  },

  // Delete user by ID
  deleteById: async (id) => {
    // Validate the ObjectId
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }

    // Perform the deletion
    const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error('User not found');
    }
    return true;
  },

  // Find all users
  findAll: async () => {
    return await userCollection.find().toArray();
  },

  // Find user by username
  findByUsername: async (username) => {
    const user = await userCollection.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  // Find user by email
  findByEmail: async (email) => {
    const user = await userCollection.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
};

module.exports = User;
