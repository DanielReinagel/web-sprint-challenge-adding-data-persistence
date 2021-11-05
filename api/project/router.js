const express = require("express");

const model = require("./model");

// project router for api/projects
const router = express.Router();

router.get("/", (req, res) => {
  model.getAll().then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({shortHand:"error getting projects from database", message:err.message, stack:err.stack, error:err}))
});

router.post("/", (req, res) => {
  res.status(500).json({message:"not implemented yet"});
});

module.exports = router;