//Tasks Model
const db = require("../../data/dbConfig");

const getAll = () => db("tasks")
  .leftJoin("projects", "tasks.project_id", "projects.project_id")
  .select("tasks.task_id", "tasks.task_description", "tasks.task_notes", "tasks.task_completed", "projects.project_name", "projects.project_description")
  .then(tasks => tasks.map(task => {return{...task, task_completed:!!task.task_completed}}));

const insert = task => db("tasks").insert(task).then(([id]) => {return {id, ...task}});

module.exports = {
  getAll,
  insert
};