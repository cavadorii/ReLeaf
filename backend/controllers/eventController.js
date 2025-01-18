const Event = require('../models/eventModel');

const eventController = {
  createEvent: async (req, res) => {
    try {
      const id = await Event.create(req.body);
      res.status(201).json({ message: 'Event created', eventId: id });
    } catch (error) {
      res.status(400).json({ error: error.toString() });
    }
  },

  getEvents: async (req, res) => {
    try {
      const events = await Event.findAll();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },

  getEventById: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ error: 'Event not found' });
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const count = await Event.updateById(req.params.id, req.body);
      if (count === 0) return res.status(404).json({ error: 'Event not found' });
      res.status(200).json({ message: 'Event updated' });
    } catch (error) {
      res.status(400).json({ error: error.toString() });
    }
  },

  getEventVolunteers: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ error: 'Event not found' });
      res.status(200).json(event.volunteers || []);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },


  deleteEvent: async (req, res) => {
    try {
      const count = await Event.deleteById(req.params.id);
      if (count === 0) return res.status(404).json({ error: 'Event not found' });
      res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
};

module.exports = eventController;
