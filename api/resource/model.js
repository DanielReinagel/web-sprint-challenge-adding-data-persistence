//Resources Model
const db = require("../../data/dbConfig");

const getAll = () => db("resources");

const insert = resource => db("resources").insert(resource).then(([id]) => {return {id, ...resource}});

module.exports = {
  getAll,
  insert
};