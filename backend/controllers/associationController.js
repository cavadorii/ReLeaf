const Association = require("../models/Association");

const AssociationController = {
  getAssociationProfile: async (req, res) => {
    try {
      const { associationId } = req.params;
      const association = await Association.findById(associationId);

      if (!association) {
        return res.status(404).json({ error: "Association not found" });
      }

      res.status(200).json(association);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createAssociation: async (req, res) => {
    try {
      const association = await Association.create(req.body);
      res.status(201).json(association);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAssociationById: async (req, res) => {
    try {
      const { associationId } = req.params;
      const association = await Association.findById(associationId);

      if (!association) {
        return res.status(404).json({ error: "Association not found" });
      }

      res.status(200).json(association);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateAssociation: async (req, res) => {
    try {
      const { associationId } = req.params;
      const updatedAssociation = await Association.updateById(associationId, req.body);

      if (!updatedAssociation) {
        return res.status(404).json({ error: "Association not found" });
      }

      res.status(200).json(updatedAssociation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteAssociation: async (req, res) => {
    try {
      const { associationId } = req.params;
      const deleted = await Association.deleteById(associationId);

      if (!deleted) {
        return res.status(404).json({ error: "Association not found" });
      }

      res.status(200).json({ message: "Association deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  addEventToAssociation: async (req, res) => {
    try {
      const { associationId } = req.params;
      const { event } = req.body;
      const updatedAssociation = await Association.addEventToAssociation(associationId, event);

      if (!updatedAssociation) {
        return res.status(404).json({ error: "Association not found" });
      }

      res.status(200).json(updatedAssociation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateVolunteerTreeCount: async (req, res) => {
    try {
      const { associationId, userId } = req.params;
      const { treeCount } = req.body;
      const updatedAssociation = await Association.updateVolunteerTreeCount(
        associationId,
        userId,
        treeCount
      );

      if (!updatedAssociation) {
        return res.status(404).json({ error: "Association or Volunteer not found" });
      }

      res.status(200).json(updatedAssociation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = AssociationController;
