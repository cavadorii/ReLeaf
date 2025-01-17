const Association = require("../models/Association"); // Ensure Association model is imported

const AssociationController = {
  // Other methods (e.g., createAssociation, updateAssociation, etc.)

  /**
   * Retrieves the profile of an association, including events and volunteer stats.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  getAssociationProfile: async (req, res) => {
    try {
      const { associationId } = req.params;

      const association = await Association.findById(associationId)
        .populate({
          path: "events",
          populate: {
            path: "volunteers.user_id",
            select: "name email",
          },
        })
        .populate("volunteers.user_id", "name email");

      res.status(200).json(association);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = AssociationController;
