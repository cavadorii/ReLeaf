const Certificate = require('../models/Certificate');

const CertificateController = {
  /**
   * Creates a new certificate.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  createCertificate: async (req, res) => {
    try {
      const certificateData = req.body;
      const newCertificate = await Certificate.create(certificateData);
      res.status(201).json({ message: 'Certificate created successfully', data: newCertificate });
    } catch (error) {
      console.error('Error creating certificate:', error);
      res.status(500).json({ message: 'Failed to create certificate', error: error.message });
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
        return res.status(404).json({ message: 'Certificate not found' });
      }
      res.status(200).json(certificate);
    } catch (error) {
      console.error('Error fetching certificate:', error);
      res.status(500).json({ message: 'Failed to fetch certificate', error: error.message });
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
        return res.status(404).json({ message: 'Certificate not found' });
      }
      res.status(200).json({ message: 'Certificate updated successfully', data: updatedCertificate });
    } catch (error) {
      console.error('Error updating certificate:', error);
      res.status(500).json({ message: 'Failed to update certificate', error: error.message });
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
        return res.status(404).json({ message: 'Certificate not found' });
      }
      res.status(200).json({ message: 'Certificate deleted successfully', data: deletedCertificate });
    } catch (error) {
      console.error('Error deleting certificate:', error);
      res.status(500).json({ message: 'Failed to delete certificate', error: error.message });
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
      console.error('Error fetching certificates by user ID:', error);
      res.status(500).json({ message: 'Failed to fetch certificates', error: error.message });
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
      console.error('Error fetching certificates by event ID:', error);
      res.status(500).json({ message: 'Failed to fetch certificates', error: error.message });
    }
  },
};

module.exports = CertificateController;
