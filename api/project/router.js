const express = require("express");

// project router for api/projects
const router = express.Router();

router.get("/", (req, res) => {
  res.status(500).json({message:"not implemented yet"});
});

router.post("/", (req, res) => {
  res.status(500).json({message:"not implemented yet"});
});

module.exports = router;