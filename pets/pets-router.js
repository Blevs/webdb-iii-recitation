const router = require('express').Router();
const Pets = require('./pets-model.js');
const restrict = require('../middleware/restrict.js');

router.get('/', restrict, (req, res) => {
  Pets.get()
    .then(pets => {
      res.status(200).json(pets);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Pets.getById(id)
    .then(pet => {
      if (pet) {
        res.status(200).json(pet);
      } else {
        res.status(404).end();
      }
    });
});

module.exports = router;
