//Tasks Model
const db = require("../../data/dbConfig");

const getAll = () => db("tasks");

const insert = task => db("tasks").insert(task).then(([id]) => {return {id, ...task}});

module.exports = {
  getAll,
  insert
};