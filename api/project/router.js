const express = require("express");

const model = require("./model");

const checkBody = (req, res, next) => {
  const { project_name, project_description, project_completed } = req.body;
  if(!project_name) res.status(400).json({message:"You must provide a project name"});
  else {
    const p = {}; req.payload = p;
    p.project_name = project_name;
    if(project_description) p.project_description = project_description;
    if(project_completed) p.project_completed = project_completed;
    next();
  }
}

// project router for api/projects
const router = express.Router();

router.get("/", (req, res) => {
  model.getAll().then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({shortHand:"error getting projects from database", message:err.message, stack:err.stack, error:err}))
});

router.post("/", checkBody, (req, res) => {
  model.insert(req.payload).then(project => res.status(201).json(project))
    .catch(err => res.status(500).json({shortHand:"error inserting project into database", message:err.message, stack:err.stack, error:err}))
});

module.exports = router;