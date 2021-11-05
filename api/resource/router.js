const express = require("express");

const model = require("./model");


const checkBody = (req, res, next) => { //TODO, check if resource_name is unique
  const { resource_name, resource_description } = req.body;
  if(!resource_name) res.status(400).json({message:"You must provide a resource name"});
  else {
    const p = {}; req.payload = p;
    p.resource_name = resource_name;
    if(resource_description) p.resource_description = resource_description;
    next();
  }
}

// resources router for api/resources
const router = express.Router();

router.get("/", (req, res) => {
  model.getAll().then(resources => res.status(200).json(resources))
    .catch(err => res.status(500).json({shortHand:"error getting resources from database", message:err.message, stack:err.stack, error:err}))
});

router.post("/", checkBody, (req, res) => {
  model.insert(req.payload).then(resource => res.status(201).json(resource))
    .catch(err => res.status(500).json({shortHand:"error inserting resource into database", message:err.message, stack:err.stack, error:err}))
});

module.exports = router;