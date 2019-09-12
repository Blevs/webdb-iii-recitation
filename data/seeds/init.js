
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pets').truncate()
    .then(() => knex('species').truncate())
    .then(() => knex('owners').truncate())
    .then(() => {
      // Inserts seed entries
      return knex('owners').insert([
        {id: 1, name: 'Henry Blevins', email: "test@abc.com"},
        {id: 2, name: 'Colonel Mustard', email: "leadpipe@diningroom.com"},
        {id: 3, name: 'Richard Feynman', email: "feyn@manners.com"},
      ]) ;
    })
    .then(() => {
      return knex('species').insert([
        {id: 1, specie: "Dog"},
        {id: 2, specie: "Cat"},
        {id: 3, specie: "Parrot"},
      ]);
    })
    .then(() => {
      return knex('pets').insert([
        {name: "Xero", age: 4, owner_id: 1, species_id: 1, care_instructions: "Good girl"},
        {name: "Mowgli", age: 10, owner_id: 1, species_id: 2, care_instructions: "Outdoor cat"},
        {name: "Strider", age: 7, owner_id: 1, species_id: 3, care_instructions: "He bites"},
        {name: "Rupert", age: 5, owner_id: 2, species_id: 1},
        {name: "Slingshot", age: 4, owner_id: 2, species_id: 1},
        {name: "Schrodinger", age: 4, owner_id: 3, species_id: 2, care_instructions: "Don't look"},
        {name: "Hamilton", age: 9, owner_id: 3, species_id: 2},
      ]);
    });
};
