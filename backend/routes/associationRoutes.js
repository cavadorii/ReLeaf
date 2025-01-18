const express = require("express");
const router = express.Router();
const AssociationController = require("../controllers/associationController");

// Get association profile by ID
router.get("/:associationId/profile", AssociationController.getAssociationProfile);

// Create a new association
router.post("/", AssociationController.createAssociation);

// Get an association by ID
router.get("/:associationId", AssociationController.getAssociationById);

// Update an association by ID
router.put("/:associationId", AssociationController.updateAssociation);

// Delete an association by ID
router.delete("/:associationId", AssociationController.deleteAssociation);

// Add an event to an association
router.post("/:associationId/events", AssociationController.addEventToAssociation);

// Update volunteer's total planted trees for an association
router.put(
  "/:associationId/volunteers/:userId/tree-count",
  AssociationController.updateVolunteerTreeCount
);

module.exports = router;
