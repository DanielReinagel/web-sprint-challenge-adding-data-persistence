const express = require("express");

const model = require("./model");

// tasks router for api/tasks
const router = express.Router();

router.get("/", (req, res) => {
  model.getAll().then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(500).json({shortHand:"error getting tasks from database", message:err.message, stack:err.stack, error:err}))
});

router.post("/", (req, res) => {
  res.status(500).json({message:"not implemented yet"});
});

module.exports = router;