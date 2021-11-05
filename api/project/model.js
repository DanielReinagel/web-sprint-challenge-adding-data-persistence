//Projects Model
const db = require("../../data/dbConfig");

const convertObj = project => {return{...project, project_completed:!!project.project_completed}};

const getAll = () => db("projects").then(projects => projects.map(convertObj));

const insert = async project => {
  let project_id;
  await db("projects").insert(project).then(([id]) => project_id=id);
  return db("projects").where({project_id}).first().then(convertObj);
};

module.exports = {
  getAll,
  insert
};