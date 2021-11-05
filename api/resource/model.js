//Resources Model
const db = require("../../data/dbConfig");

const getAll = () => db("resources");

const insert = async resource => {
  let resource_id;
  await db("resources").insert(resource).then(([id]) => resource_id=id);
  return db("resources").where({resource_id}).first();
}

module.exports = {
  getAll,
  insert
};