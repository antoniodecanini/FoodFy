const express = require('express');
const nunjucks = require('nunjucks');
const receitas = require('./public/data');

const server = express();

server.use(express.static('public'));
server.set('view engine', 'njk');

nunjucks.configure('view', {
  express: server,
});

server.get('/', function(req, res) {
  res.render('index', { receitas });
});

server.get('/receitas', function(req, res) {
  res.render('receitas', { receitas });
});

server.get('/receita/:index', function(req, res) {
  const index = req.params.index;
  
  const receita = receitas[index];
  
  res.render('receita', { receita });
});

server.get('/sobre', function(req, res) {
  res.render('sobre');
});

server.listen('5500', function() {
  console.log('Server running successful');
});
