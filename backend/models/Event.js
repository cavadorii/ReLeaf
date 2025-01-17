const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  association_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Association",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  max_volunteers: { type: Number, default: 0 },
  volunteers: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["confirmed", "pending", "cancelled"],
        default: "pending",
      },
      trees_planted: { type: Number, default: 0 }, // Tracks the number of trees planted by the volunteer
    },
  ],
  total_trees_planted: { type: Number, default: 0 }, // Tracks total trees planted in the event
});

const Event = mongoose.model("Event", eventSchema);

// CRUD Operations
// Create
async function createEvent(data) {
  return await Event.create(data);
}

// Read by ID
async function getEventById(id) {
  return await Event.findById(id)
    .populate("association_id")
    .populate("volunteers.user_id");
}

// Update by ID
async function updateEvent(id, data) {
  return await Event.findByIdAndUpdate(id, data, { new: true });
}

// Update volunteer status and tree count
async function updateVolunteerStatus(eventId, userId, updates) {
  return await Event.findOneAndUpdate(
    { _id: eventId, "volunteers.user_id": userId },
    { $set: { "volunteers.$": updates } },
    { new: true }
  );
}

// Increment tree count for the event
async function incrementTreeCount(eventId, treeCount) {
  return await Event.findByIdAndUpdate(
    eventId,
    { $inc: { total_trees_planted: treeCount } },
    { new: true }
  );
}

// Delete by ID
async function deleteEvent(id) {
  return await Event.findByIdAndDelete(id);
}

module.exports = {
  Event,
  createEvent,
  getEventById,
  updateEvent,
  updateVolunteerStatus,
  incrementTreeCount,
  deleteEvent,
};
