const db = require('../../config/db');

module.exports = {
  index(callback) {
    query = `
      SELECT *
      FROM chefs
    `

    db.query(query, (err, results) => {
      if(err) throw `Database Error! ${err}`;

      callback(results.rows);
    })
  },
  
  show(id, callback) {
    const query = `
      SELECT 
        chefs.*,
        recipes.title AS recipe_title,
        recipes.image AS recipe_image,
        recipes.id AS recipe_id,
        (
          SELECT count(recipes)
          FROM chefs
          LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
          WHERE chefs.id = $1
          GROUP BY chefs.id
        ) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      WHERE chefs.id = $1
    `

    db.query(query, [id], (err, results) => {
      if(err) throw `Database Error! ${err}`;
      callback(results.rows);
    })
  },
  
  store(values, callback) {
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0]);
    })
  },

  update(values, callback) {
    const query = `
      UPDATE chefs SET
        name=($1),
        avatar_url=($2)
      WHERE id = $3
    `

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback();
    })
  },

  destroy(id, callback) {
    query = `
      DELETE
      FROM chefs
      WHERE id = $1
    `

    db.query(query, [id], (err, results) => {
      if(err) throw `Database Error! ${err}`;

      callback();
    })
  }
}