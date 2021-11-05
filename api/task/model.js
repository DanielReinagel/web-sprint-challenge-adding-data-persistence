//Tasks Model
const db = require("../../data/dbConfig");

const convertObj = task => {return{...task, task_completed:!!task.task_completed}};

const getAll = () => db("tasks")
  .leftJoin("projects", "tasks.project_id", "projects.project_id")
  .select("tasks.task_id", "tasks.task_description", "tasks.task_notes", "tasks.task_completed", "projects.project_name", "projects.project_description")
  .then(tasks => tasks.map(convertObj));

const insert = async task => {
  let task_id;
  await db("tasks").insert(task).then(([id]) => task_id=id);
  return db("tasks").where({task_id}).first().then(convertObj);
}

module.exports = {
  getAll,
  insert
};