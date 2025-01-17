const mongoose = require("mongoose");

const associationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }], // Tracks events created by the association
  volunteers: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      total_planted_trees: { type: Number, default: 0 }, // Tracks the total trees planted by the volunteer
    },
  ],
});

const Association = mongoose.model("Association", associationSchema);

// CRUD Operations
// Create
async function createAssociation(data) {
  return await Association.create(data);
}

// Read by ID
async function getAssociationById(id) {
  return await Association.findById(id)
    .populate("user_id")
    .populate("events")
    .populate("volunteers.user_id");
}

// Update by ID
async function updateAssociation(id, data) {
  return await Association.findByIdAndUpdate(id, data, { new: true });
}

// Add an event to the association
async function addEventToAssociation(associationId, eventId) {
  return await Association.findByIdAndUpdate(
    associationId,
    { $push: { events: eventId } },
    { new: true }
  );
}

// Update volunteer tree count
async function updateVolunteerTreeCount(associationId, userId, treesPlanted) {
  return await Association.findOneAndUpdate(
    { _id: associationId, "volunteers.user_id": userId },
    { $inc: { "volunteers.$.total_planted_trees": treesPlanted } },
    { new: true, upsert: true } // Upsert ensures the volunteer is added if not already present
  );
}

// Delete by ID
async function deleteAssociation(id) {
  return await Association.findByIdAndDelete(id);
}

module.exports = {
  Association,
  createAssociation,
  getAssociationById,
  updateAssociation,
  addEventToAssociation,
  updateVolunteerTreeCount,
  deleteAssociation,
};
