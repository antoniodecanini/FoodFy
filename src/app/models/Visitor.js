const db = require('../../config/db');

module.exports = {
  index(callback) {
    const query = `
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      LIMIT 6
    `

    db.query(query, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows);
    })
  },

  chefList(callback) {
    const query = `
      SELECT chefs.*, count(recipes) AS qtd_recipes
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      GROUP BY chefs.id
    `

    db.query(query, (err, results) => {
      if(err) throw `Database Error! ${err}`;

      callback(results.rows);
    })
  },

  search(filter, callback) {
    const query = `
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.title ILIKE '%${filter}%'
    `;

    db.query(query, (err, results) => {
      if(err) throw `Database Error! ${err}`;

      callback(results.rows);
    })
  },
}