const Certificate = require("../models/Certificate");

const CertificateController = {
  /**
   * Creates a new certificate.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  generateCertificates: async (req, res) => {
    try {
      const { eventId } = req.params;

      // Fetch event with volunteer data
      const event = await Event.findById(eventId).populate(
        "volunteers.user_id"
      );
      if (!event) return res.status(404).json({ error: "Event not found" });

      const certificates = [];
      for (const volunteer of event.volunteers) {
        const { user_id, trees_planted } = volunteer;
        const points =
          trees_planted <= 3
            ? trees_planted * 5
            : 15 + (trees_planted - 3) * 10; // 5 points for first 3, 10 points for subsequent

        // Create certificate
        const certificate = await Certificate.create({
          event_id: eventId,
          user_id: user_id._id,
          points,
          description: `Thank you for planting ${trees_planted} trees!`,
        });

        // Update points in leaderboard
        await Leaderboard.create({
          event_id: eventId,
          user_id: user_id._id,
          points,
          rank: null, // Rank will be calculated later
        });

        certificates.push(certificate);
      }

      res.status(201).json({
        message: "Certificates generated successfully",
        certificates,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Retrieves a certificate by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  getCertificateById: async (req, res) => {
    try {
      const { id } = req.params;
      const certificate = await Certificate.findById(id);
      if (!certificate) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      res.status(200).json(certificate);
    } catch (error) {
      console.error("Error fetching certificate:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch certificate", error: error.message });
    }
  },

  /**
   * Updates a certificate by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  updateCertificateById: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedCertificate = await Certificate.updateById(id, updates);
      if (!updatedCertificate) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      res
        .status(200)
        .json({
          message: "Certificate updated successfully",
          data: updatedCertificate,
        });
    } catch (error) {
      console.error("Error updating certificate:", error);
      res
        .status(500)
        .json({
          message: "Failed to update certificate",
          error: error.message,
        });
    }
  },

  /**
   * Deletes a certificate by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  deleteCertificateById: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCertificate = await Certificate.deleteById(id);
      if (!deletedCertificate) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      res
        .status(200)
        .json({
          message: "Certificate deleted successfully",
          data: deletedCertificate,
        });
    } catch (error) {
      console.error("Error deleting certificate:", error);
      res
        .status(500)
        .json({
          message: "Failed to delete certificate",
          error: error.message,
        });
    }
  },

  /**
   * Retrieves all certificates for a specific user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  getCertificatesByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const certificates = await Certificate.findByUserId(userId);
      res.status(200).json(certificates);
    } catch (error) {
      console.error("Error fetching certificates by user ID:", error);
      res
        .status(500)
        .json({
          message: "Failed to fetch certificates",
          error: error.message,
        });
    }
  },

  /**
   * Retrieves all certificates for a specific event.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  getCertificatesByEventId: async (req, res) => {
    try {
      const { eventId } = req.params;
      const certificates = await Certificate.findByEventId(eventId);
      res.status(200).json(certificates);
    } catch (error) {
      console.error("Error fetching certificates by event ID:", error);
      res
        .status(500)
        .json({
          message: "Failed to fetch certificates",
          error: error.message,
        });
    }
  },
};

module.exports = CertificateController;
