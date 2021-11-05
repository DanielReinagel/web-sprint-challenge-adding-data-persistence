const express = require("express");

const model = require("./model");

// resources router for api/resources
const router = express.Router();

router.get("/", (req, res) => {
  model.getAll().then(resources => res.status(200).json(resources))
    .catch(err => res.status(500).json({shortHand:"error getting resources from database", message:err.message, stack:err.stack, error:err}))
});

router.post("/", (req, res) => {
  res.status(500).json({message:"not implemented yet"});
});

module.exports = router;