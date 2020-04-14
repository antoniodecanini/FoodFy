const Chef = require('../models/Chef');
const { date } = require('../lib/utils');

module.exports = {
  index(req, res) {
    Chef.index((chefs) => {
      res.render('adminArea/chefs/chefs', { chefs })
    })
  },

  show(req, res) {
    const id = req.params.id;

    Chef.show(id, (chef) => {
      if(!chef) return res.send('Chefe não encontrado');

      res.render('adminArea/chefs/chef', { chef })
    })
  },

  create(req, res) {
    res.render('adminArea/chefs/create');
  },

  store(req, res) {
    const keys = Object.keys(req.body)

    for(key in keys) {
      if(req.body[key] == "") {
        return res.send("Favor preencher todos os campos!")
      }
    }

    const values = [
      req.body.name,
      req.body.avatar_url,
      date(Date.now()).iso
    ];

    Chef.store(values, (chef) => {
      res.redirect(`chefs/${chef.id}`);
    })
  },

  edit(req, res) {
    const id = req.params.id;

    Chef.show(id, (chef) => {
      if(!chef) return res.send('Chefe não encontrado');

      res.render('adminArea/chefs/edit', { chef })
    })
  },

  update(req, res) {
    const keys = Object.keys(req.body)

    for(key in keys) {
      if(req.body[key] == "") {
        return res.send("Favor preencher todos os campos!")
      }
    }
    
    const values = [
      req.body.name,
      req.body.avatar_url,
      req.body.id
    ];

    Chef.update(values, () => {
      res.redirect(`chefs/${req.body.id}`)
    })
  },

  destroy(req, res) {
    const id = req.body.id;

    Chef.show(id, (chef) => {
      if(chef[0].total_recipes > 0){
        return res.send("Não é possível deletar um chef que possua ao menos uma receita cadastrada");
      }

      Chef.destroy(id, () => {
        res.redirect('chefs');
      })
    })
  },
}