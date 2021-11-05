//Projects Model
const db = require("../../data/dbConfig");

const getAll = () => db("projects").then(projects => projects.map(project => {return{...project, project_completed:!!project.project_completed}}));

const insert = project => db("projects").insert(project).then(([id]) => {return {id, ...project}});

module.exports = {
  getAll,
  insert
};