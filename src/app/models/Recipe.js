const db = require('../../config/db');

module.exports = {
  index(callback) {
    const query = `
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    `

    db.query(query, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows)      
    })

  },

  show(id, callback) {
    const query = `
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.id = $1
    `
    
    db.query(query, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback(results.rows[0]);
    });
  },

  store(values, callback) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `
    
    db.query(query, values, (err, results) => {
      if(err) throw `Dabatabase Error! ${err}`

      callback(results.rows[0]);
    })
  },

  update(values, callback) {
    const query = `
      UPDATE recipes SET
        chef_id=($1),
        image=($2),
        title=($3),
        ingredients=($4),
        preparation=($5),
        information=($6)
      WHERE id = $7
    `

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback();
    })
  },

  destoy(id, callback) {
    query = `
      DELETE
      FROM recipes
      WHERE id = $1
    `

    db.query(query, [id], (err, results) => {
      if(err) throw `Database Error! ${err}`;

      callback();
    })
  }
}