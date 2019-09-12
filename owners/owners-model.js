const db = require('../data/db.js');
const Pets = require('../pets/pets-model.js');

module.exports = {
  get,
  getById,
  insert,
  update
};

function get() {
  return db('owners');
}

function getById(id) {
  const ownerQuery = db('owners').where({ id }).first();
  return Promise.all([ownerQuery, Pets.getByOwnerId(id)])
    .then(([owner, pets]) => {
      owner.pets = pets;
      return owner;
    });

  // return db('owners').where({ id }).first()
  //   .then(owner => {
  //     return Pets.getByOwnerId(id)
  //       .then(pets => {
  //         owner.pets = pets;
  //         return owner;
  //       });
  //   });
}

function insert(owner) {
  return db('owners')
    .insert(owner, 'id')
    .then(([id]) => getById(id));
}

function update(id, ownerChanges) {
  return db('owners')
    .update(ownerChanges)
    .where({ id })
    .then(updated => updated ? getById(id) : null);
}
