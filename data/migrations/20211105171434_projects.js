exports.up = function(knex) {
  
  return knex.schema.createTable("projects", table => {
    table.increments("project_id"),
    table.string("project_name", 128).notNullable(),
    table.string("project_description", 1024),
    table.boolean("project_completed").defaultTo(false)
  }).createTable("resources", table => {
    table.increments("resource_id"),
    table.string("resource_name", 128).notNullable().unique(),
    table.string("resource_description", 1024)
  }).createTable("tasks", table => {
    table.increments("task_id"),
    table.string("task_description", 1024).notNullable(),
    table.string("task_notes", 1024),
    table.boolean("task_completed").defaultTo(false),
    table.integer("project_id").notNullable().unsigned().references("project_id").inTable("projects")
  }).createTable("project_resources", table => {
    table.increments(),
    table.integer("project_id").notNullable().unsigned().references("project_id").inTable("projects"),
    table.integer("resource_id").notNullable().unsigned().references("resource_id").inTable("resources")
  })

};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects")
};