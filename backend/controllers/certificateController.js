const { default: axios } = require('axios');
const Certificate = require('../models/Certificate');
const UserController = require('./usersController');
const PDFDocument = require('pdfkit');

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
      const deletedCertificate = await this.getCertificateById(id);
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

  /**
  * Downloads a certificate as a PDF.
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  */
  downloadCertificate: async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate the ID
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid certificate ID format' });
      }
  
      const certificate = await Certificate.findById(id);
  
      if (!certificate) {
        return res.status(404).json({ message: 'Certificate not found' });
      }
  
      const user = (await axios.get(`http://localhost:5000/api/users/${certificate.userId}`)).data;
      const event = (await axios.get(`http://localhost:5000/api/events/${certificate.eventId}`)).data;
  
      // Import PDFKit
      const PDFDocument = require('pdfkit');
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
  
      // Set headers for PDF response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="certificate_${id}.pdf"`
      );
  
      // Pipe the document to the response
      doc.pipe(res);
  
      // Add a border or frame
      doc
        .lineWidth(3)
        .rect(25, 25, doc.page.width - 50, doc.page.height - 50)
        .strokeColor('#4CAF50')
        .stroke();
  
      // Add a title with a background color
      doc
        .fillColor('#FFFFFF')
        .rect(0, 80, doc.page.width, 50)
        .fill('#4CAF50')
        .fontSize(28)
        .fillColor('#FFFFFF')
        .text('Certificate of Achievement', 0, 90, {
          align: 'center',
          lineGap: 10,
        });
  
      // Add recipient details
      doc
        .moveDown(2)
        .fontSize(20)
        .fillColor('#000000')
        .text("Awarded to:", { align: 'center' })
        .fontSize(24)
        .font('Helvetica-Bold')
        .text(user.username, { align: 'center' });
  
      // Add event details
      doc
        .moveDown(1)
        .font('Helvetica')
        .fontSize(16)
        .text("For successfully completing:", { align: 'center' })
        .font('Helvetica-Bold')
        .fontSize(20)
        .text(event.title, { align: 'center' });
  
      // Add the issue date
      doc
        .moveDown(2)
        .font('Helvetica')
        .fontSize(14)
        .text(`Issued on: ${new Date(certificate.issued_at).toLocaleDateString()}`, { align: 'center' });
  
      // Finalize the PDF
      doc.end();
    } catch (error) {
      console.error('Error downloading certificate:', error);
      res.status(500).json({ message: 'Failed to download certificate', error: error.message });
    }
  }
};

const isValidObjectId = (id) => {
  const { ObjectId } = require('mongodb');
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
};

module.exports = CertificateController;