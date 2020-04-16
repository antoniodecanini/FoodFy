const Visitor = require('../models/Visitor')
const Recipe = require('../models/Recipe')

module.exports = {
  index(req, res) {
    Recipe.index((recipes) => {
      res.render('userArea/recipes/recipes', { recipes });
    })
  },

  show(req, res) {
    const id = req.params.id;

    Recipe.show(id, (recipe) => {
      if(!recipe) return res.send('Receita não encontrada');

      res.render('userArea/recipes/recipe', { recipe });
    })
  },

  home(req, res) {
    Visitor.index((recipes) => {
      res.render('userArea/index', { recipes });
    })
  },

  about(req, res) {
    res.render('userArea/sobre');
  },

  chefs(req, res) {
    Visitor.chefList((chefs) => {
      res.render('userArea/chefs', { chefs });
    })
  },

  search(req, res) {
    let filter = req.query.filter;

    if(filter == "") {
      return res.redirect('/receitas');
    }

    Visitor.search(filter, (recipes) => {      
      res.render(`userArea/recipes/search`, { recipes, filter })
    })
  },
}