//Projects Model
const db = require("../../data/dbConfig");

const getAll = () => db("projects");

const insert = project => db("projects").insert(project).then(([id]) => {return {id, ...project}});

module.exports = {
  getAll,
  insert
};