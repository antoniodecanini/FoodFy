const { date } = require('../lib/utils');
const Recipe = require('../models/Recipe');
const Chef = require('../models/Chef');

module.exports = {
  index(req, res) {
    Recipe.index((recipes) => {
      return res.render('adminArea/recipes/recipes', { recipes })
    })
  },

  show(req, res) {
    const id = req.params.id;

    Recipe.show(id, (recipe) => {
      if(!recipe) {
        return res.send("Receita não encontrada")
      }

      res.render('adminArea/recipes/recipe', { recipe });
    });
  },

  create(req, res) {
    Chef.index((chefs) => {
      res.render('adminArea/recipes/create', { chefs })
    })
  },

  store(req, res) {
    const keys = Object.keys(req.body)

    for(key in keys) {
      if(req.body[key] == "") {
        return res.send("Favor preencher todos os campos!")
      }
    }

    const values = [
      req.body.chef_id,
      req.body.image,
      req.body.title,
      req.body.ingredients,
      req.body.preparation,
      req.body.information,
      date(Date.now()).iso
    ]

    Recipe.store(values, (recipe) => {
      console.log(recipe.id)
      return res.redirect(`receitas/${recipe.id}`)
    });
  },

  edit(req, res) {
    const { id } = req.params;

    Recipe.show(id, (recipe) => {
      if(!recipe) {
        return res.send("Receita não encontrada")
      }

      Chef.index((chefs) => {
        res.render('adminArea/recipes/edit', { recipe, chefs })
      })
    });
  },

  update(req, res) {
    const values = [
      +req.body.chef_id,
      req.body.image,
      req.body.title,
      req.body.ingredients,
      req.body.preparation,
      req.body.information,
      +req.body.id
    ];

    Recipe.update(values, () => {
      return res.redirect(`receitas/${req.body.id}`);
    })
  },

  destroy(req, res) {
    const id = req.body.id;

    Recipe.destoy(id, () => {
      return res.redirect('receitas');
    })
  },
}
