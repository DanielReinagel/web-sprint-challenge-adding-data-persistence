const express = require("express");

// tasks router for api/tasks
const router = express.Router();

router.get("/", (req, res) => {
  res.status(500).json({message:"not implemented yet"});
});

router.post("/", (req, res) => {
  res.status(500).json({message:"not implemented yet"});
});

module.exports = router;