const express = require('express');
const recipes = require('./app/controllers/recipes');
const chefs = require('./app/controllers/chefs');
const visitors = require('./app/controllers/visitors');

const routes = express.Router();

routes.get('/', visitors.home);
routes.get('/sobre', visitors.about);
routes.get('/receitas', visitors.index);
routes.get('/receitas/busca', visitors.search)
routes.get('/receitas/:id', visitors.show);
routes.get('/chefs', visitors.chefs);

routes.get("/admin/receitas", recipes.index);
routes.get("/admin/receitas/criar", recipes.create);
routes.get("/admin/receitas/:id", recipes.show);
routes.get("/admin/receitas/:id/editar", recipes.edit);
routes.post("/admin/recipes", recipes.store);
routes.put("/admin/recipes", recipes.update);
routes.delete("/admin/recipes", recipes.destroy);

routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/criar", chefs.create);
routes.get("/admin/chefs/:id", chefs.show);
routes.get("/admin/chefs/:id/editar", chefs.edit);
routes.post("/admin/chefs", chefs.store);
routes.put("/admin/chefs", chefs.update);
routes.delete("/admin/chefs", chefs.destroy);

module.exports = routes;