const router = require('express').Router();
const Owners = require('./owners-model.js');
const Pets = require('../pets/pets-model.js');

router.get('/', (req, res) => {
  Owners.get()
    .then(owners => {
      res.status(200).json(owners);
    });
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  Owners.insert({ name, email })
    .then(owner => res.status(200).json(owner));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Owners.getById(id)
    .then(owner => {
      if (owner) {
        res.status(200).json(owner);
      } else {
        res.status(404).end();
      }
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  Owners.update(id, { name, email })
    .then(owner => {
      if (owner) {
        res.status(200).json(owner);
      } else {
        res.status(404).end();
      }
    });
});

router.get('/:id/pets', (req, res) => {
  const { id } = req.params;
  Pets.getByOwnerId(id)
    .then(pets => {
      res.status(200).json(pets);
    });
});

router.post('/:owner_id/pets', (req, res) => {
  const { owner_id } = req.params;
  const { name, care_instructions, species_id, age } = req.body;
  Pets.insert({ name, care_instructions, species_id, age, owner_id: parseInt(owner_id, 10) })
    .then(pets => {
      res.status(200).json(pets);
    });
});

module.exports = router;
