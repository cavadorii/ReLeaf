const {client} = require('../config/database');

const eventFeedbackCollection = client.db('Cluster0').collection('eventFeedback');

const EventFeedback = {
    create: async(eventFeedback) => {
        eventFeedback.date_submitted = new Date().toISOString();
        const result = await eventFeedbackCollection.insertOne(eventFeedback);
        return result;
    },

    findById: async(id) => {
        return await eventFeedbackCollection.findOne({id});
    }
};

module.exports = EventFeedback;