// Import mongoose
const mongoose = require("mongoose");

// Event feedback schema
const eventFeedbackSchema = new mongoose.Schema({
    event_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
    volunteer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    rating: {type: Number, required: true},
    comment: {type: String, default: ""},
    date_sumbitted: {Type: Date, required: true}
});

// Event feedback model
const EventFeedback = mongoose.model('EventFeedback', eventFeedbackSchema);


// Create
async function createEventFeedback(data) {
    return await EventFeedback.create(data);
}

//Read by ID
async function getEventFeedbackById(id) {
    return await EventFeedback.findById(id).populate(event_id);
}

// Update by ID
async function updateEventFeedback(id, data) {
    return await EventFeedback.findByIdAndUpdate(id, data, {new: true});
}

// Delete by ID
async function deleteEventFeedback(id) {
    return await EventFeedback.findByIdAndDelete(id);
}

module.exports = {EventFeedback, createEventFeedback, getEventFeedbackById, updateEventFeedback, deleteEventFeedback};
