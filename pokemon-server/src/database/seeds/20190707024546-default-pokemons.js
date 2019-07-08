const path = require('path');
const fs = require('fs');

const pokemons = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '..', '..', 'assets', 'pokemon-list.json'),
    'utf8'
  )
);

const now = new Date();

for (const key of Object.keys(pokemons)) {
  pokemons[key].created_at = now;
  pokemons[key].updated_at = now;
}

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('pokemons', pokemons, {}),

  down: queryInterface => queryInterface.bulkDelete('pokemons', null, {}),
};
