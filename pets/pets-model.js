const db = require('../data/db.js');

module.exports = {
  get,
  getById,
  getByOwnerId,
  insert
};

function get() {
  return db('pets')
    .select([
      'pets.id',
      'pets.name',
      'pets.owner_id',
      'pets.care_instructions',
      'pets.age',
      'species.specie',
      'owners.name AS owner_name',
      'owners.email AS owner_email',
    ])
    .leftJoin('owners', 'owners.id', 'pets.owner_id')
    .join('species', 'species.id', 'pets.species_id');
}

function getById(id) {
  return get().where({ "pets.id": id }).first();
}

function getByOwnerId(id) {
  return get().where({ "pets.owner_id": id });
}

function insert(pets) {
  return db('pets')
    .insert(pets, 'id')
    .then(([id]) => getById(id));
}

function speciesId(specie_name) {
  return db('species')
    .where({ specie: specie_name })
    .first()
    .then(specie => specie ? specie.id : null);
}
