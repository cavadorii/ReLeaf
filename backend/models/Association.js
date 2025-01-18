const { client } = require("../config/database");

const Association = {
  getCollection: () => client.db("Cluster0").collection("associations"),
  async create(data) {
    const collection = this.getCollection();
    const result = await collection.insertOne(data);
    return { _id: result.insertedId, ...data }; // Return the inserted document with its ID
  },
  
  async findById(id) {
    const collection = this.getCollection();
    const objectId = require("mongodb").ObjectId;
    return await collection.findOne({ _id: new objectId(id) });
  },

  async updateById(id, data) {
    const collection = this.getCollection();
    const objectId = require("mongodb").ObjectId;
    const result = await collection.findOneAndUpdate(
      { _id: new objectId(id) },
      { $set: data },
      { returnDocument: "after" }
    );
    return result.value;
  },

  async deleteById(id) {
    const collection = this.getCollection();
    const objectId = require("mongodb").ObjectId;
    const result = await collection.deleteOne({ _id: new objectId(id) });
    return result.deletedCount > 0;
  },

  async addEventToAssociation(id, eventId) {
    const collection = this.getCollection();
    const objectId = require("mongodb").ObjectId;
    const result = await collection.findOneAndUpdate(
      { _id: new objectId(id) },
      { $push: { events: eventId } },
      { returnDocument: "after" }
    );
    return result.value;
  },

  async updateVolunteerTreeCount(associationId, userId, treesPlanted) {
    const collection = this.getCollection();
    const objectId = require("mongodb").ObjectId;
    const result = await collection.findOneAndUpdate(
      { _id: new objectId(associationId), "volunteers.user_id": new objectId(userId) },
      { $inc: { "volunteers.$.total_planted_trees": treesPlanted } },
      { returnDocument: "after" }
    );
    return result.value;
  },
};

module.exports = Association;
