const { client } = require('../config/database');

const certificateCollection = client.db('Cluster0').collection('certificates');

const Certificate = {
  /**
   * Creates a new certificate in the database.
   * @param {Object} certificate - The certificate data.
   * @returns {Object} - The inserted certificate.
   */
  create: async (certificate) => {
    certificate.issued_at = new Date().toISOString();
    const result = await certificateCollection.insertOne(certificate);
    return result;
  },

  /**
   * Finds a certificate by its ID.
   * @param {string} id - The certificate ID.
   * @returns {Object|null} - The found certificate or null if not found.
   */
  findById: async (id) => {
    const { ObjectId } = require('mongodb');
    return await certificateCollection.findOne({ _id: new ObjectId(id) });
  },

  /**
   * Updates a certificate by its ID.
   * @param {string} id - The certificate ID.
   * @param {Object} updates - The fields to update.
   * @returns {Object|null} - The updated certificate or null if not found.
   */
  updateById: async (id, updates) => {
    const { ObjectId } = require('mongodb');
    const result = await certificateCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: 'after' }
    );
    return result.value;
  },

  /**
   * Deletes a certificate by its ID.
   * @param {string} id - The certificate ID.
   * @returns {Object|null} - The deleted certificate or null if not found.
   */
  deleteById: async (id) => {
    const { ObjectId } = require('mongodb');
    const result = await certificateCollection.findOneAndDelete({ _id: new ObjectId(id) });
    return result.value;
  },

  /**
   * Finds certificates by user ID.
   * @param {string} userId - The user ID.
   * @returns {Array} - A list of certificates.
   */
  findByUserId: async (userId) => {
    return await certificateCollection.find({ user_id: userId }).toArray();
  },

  /**
   * Finds certificates by event ID.
   * @param {string} eventId - The event ID.
   * @returns {Array} - A list of certificates.
   */
  findByEventId: async (eventId) => {
    return await certificateCollection.find({ event_id: eventId }).toArray();
  },
};

module.exports = Certificate;