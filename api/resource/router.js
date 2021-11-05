const express = require("express");

const model = require("./model");


const checkBody = async (req, res, next) => {
  const { resource_name, resource_description } = req.body;
  if(!resource_name) res.status(400).json({message:"You must provide a resource name"});
  else {
    let unique = true; let error = false;
    await model.getAll().then(resources => unique = resources.reduce((acc, r) => acc&&r.resource_name!==resource_name, true))
      .catch(err => {unique=false; error=true; res.status(500).json({shortHand:"error getting resources from database", message:err.message, stack:err.stack, error:err});}); //On one line because this line of code should never be run and should generally be ignored.
    
    if(unique){
      const p = {}; req.payload = p;
      p.resource_name = resource_name;
      if(resource_description) p.resource_description = resource_description;
      next();
    } else if(!error) res.status(400).json({message:"That resource name is already taken"});
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