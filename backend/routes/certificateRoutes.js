const express = require("express");
const CertificateController = require("../controllers/certificateController");

const router = express.Router();

router.post("/", CertificateController.generateCertificates);
router.get("/:id", CertificateController.getCertificateById);
router.put("/:id", CertificateController.updateCertificateById);
router.delete("/:id", CertificateController.deleteCertificateById);
router.get("/user/:userId", CertificateController.getCertificatesByUserId);
router.get("/event/:eventId", CertificateController.getCertificatesByEventId);

module.exports = router;
