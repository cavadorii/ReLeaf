const express = require("express");
const router = express.Router();
const AssociationController = require("../controllers/associationController");

// Route for association profile
router.get(
  "/:associationId/profile",
  AssociationController.getAssociationProfile
);

module.exports = router;
