const EventFeedback = require('../models/eventFeedbackModel');

const feedbackController = {
    writeFeedback: async (req, res) => {
        const {event_id, volunteer_id, rating, commment, date_submitted} = req.body;
        try {
            const newFeedback = {event_id, volunteer_id, rating, commment, date_submitted};
            const result = await EventFeedback.create(newFeedback);
            res.status(201).json({message: "Feedback added successfully"});
        } catch (error) {
            res.status(400).json({error : error.toString()});
        }
    },

    getEventFeedbackById: async (req, res) => {
        const id = req.id;
        const feedback = await EventFeedback.getEventFeedbackById(id);
        
        if (!feedback) return res.status(404).json({message:'"Event feedback not found'})
        
        return res.status(200).json(feedback);
    }
};