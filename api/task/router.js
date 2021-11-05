const express = require("express");

const model = require("./model");

const checkBody = async (req, res, next) => {
  const { task_description, task_notes, task_completed, project_id } = req.body;
  if(!task_description) res.status(400).json({message:"You must provide a task description"});
  else if(!project_id) res.status(400).json({message:"You must provide a project id"});
  else {
    let idExists = false; let error = false;
    await require("../project/model").getAll()
      .then(projects => idExists = projects.reduce((acc, p) => acc||p.project_id===project_id, false))
      .catch(err => {error=true; res.status(500).json({shortHand:"error getting projects from database", message:err.message, stack:err.stack, error:err});}); //On one line because this line of code should never be run and should generally be ignored.

    if(idExists){
      const p = {}; req.payload = p;
      p.task_description = task_description;
      p.project_id = project_id
      if(task_notes) p.task_notes = task_notes;
      if(task_completed) p.task_completed = task_completed;
      next();
    } else if(!error) res.status(400).json({message:"You must input a valid project_id"});
  }
}

// tasks router for api/tasks
const router = express.Router();

router.get("/", (req, res) => {
  model.getAll().then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(500).json({shortHand:"error getting tasks from database", message:err.message, stack:err.stack, error:err}))
});

router.post("/", checkBody, (req, res) => {
  model.insert(req.payload).then(task => res.status(201).json(task))
    .catch(err => res.status(500).json({shortHand:"error inserting task into database", message:err.message, stack:err.stack, error:err}))
});

module.exports = router;