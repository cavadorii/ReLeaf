const Association = require("../models/Association");

const AssociationController = {
  getAssociationProfile: async (req, res) => {
    try {
      const { associationId } = req.params;
      const association = await Association.findById(associationId)
        .populate({
          path: "events",
          populate: { path: "volunteers.user_id", select: "name email" },
        })
        .populate("volunteers.user_id", "name email");

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
      const updatedAssociation = await Association.findByIdAndUpdate(
        associationId,
        req.body,
        { new: true }
      );
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
      const deletedAssociation = await Association.findByIdAndDelete(associationId);
      if (!deletedAssociation) {
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
      const association = await Association.findById(associationId);
      if (!association) {
        return res.status(404).json({ error: "Association not found" });
      }
      association.events.push(event);
      await association.save();
      res.status(200).json(association);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateVolunteerTreeCount: async (req, res) => {
    try {
      const { associationId, userId } = req.params;
      const { treeCount } = req.body;
      const association = await Association.findById(associationId);
      if (!association) {
        return res.status(404).json({ error: "Association not found" });
      }

      const volunteer = association.volunteers.find(
        (vol) => vol.user_id.toString() === userId
      );
      if (!volunteer) {
        return res.status(404).json({ error: "Volunteer not found" });
      }

      volunteer.totalPlantedTrees = treeCount;
      await association.save();

      res.status(200).json(association);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = AssociationController;
