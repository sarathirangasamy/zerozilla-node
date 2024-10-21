const express = require("express");
const {
  createAgencyAndClient,
  updateClient,
  getTopClient,
} = require("../controllers/agencyAndClientController");
const { authenticateToken } = require("../middleware/authentication");
const router = express.Router();

// Create agency and client //
router.post("/agency-client", authenticateToken, createAgencyAndClient);

// Update client //
router.put("/client/:id", authenticateToken, updateClient);

// Get agency with top clients //
router.get("/agency/top-client", authenticateToken, getTopClient);

module.exports = router;
