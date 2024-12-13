const registrationService = require('../models/registration'); // Adjust the path as needed

const registrationController = {
  async create(req, res) {
    try {
      const registration = await registrationService.create(req.body);
      res.status(201).json({ message: "Registration created successfully", data: registration });
    } catch (error) {
      res.status(500).json({ message: "Error creating registration", error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const registration = await registrationService.findById(req.params.id);
      res.status(200).json({ data: registration });
    } catch (error) {
      res.status(404).json({ message: "Registration not found", error: error.message });
    }
  },

  async getByUserId(req, res) {
    try {
      const registrations = await registrationService.findByUserId(req.params.userId);
      res.status(200).json({ data: registrations });
    } catch (error) {
      res.status(404).json({ message: "No registrations found for the user", error: error.message });
    }
  },
  async getAll(req, res) {
    try {
      const registrations = await registrationService.findAll();
      res.status(200).json({ data: registrations });
    } catch (error) {
      res.status(500).json({ message: "Error fetching registrations", error: error.message });
    }
  },
  async getByEventId(req, res) {
    try {
      const registrations = await registrationService.findByEventId(req.params.eventId);
      res.status(200).json({ data: registrations });
    } catch (error) {
      res.status(404).json({ message: "No registrations found for the event", error: error.message });
    }
  },

  async update(req, res) {
    try {
      const updatedRegistration = await registrationService.updateById(req.params.id, req.body);
      res.status(200).json({ message: "Registration updated successfully", data: updatedRegistration });
    } catch (error) {
      res.status(500).json({ message: "Error updating registration", error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deletedRegistration = await registrationService.deleteById(req.params.id);
      res.status(200).json({ message: "Registration deleted successfully", data: deletedRegistration });
    } catch (error) {
      res.status(500).json({ message: "Error deleting registration", error: error.message });
    }
  }
};

module.exports = registrationController;