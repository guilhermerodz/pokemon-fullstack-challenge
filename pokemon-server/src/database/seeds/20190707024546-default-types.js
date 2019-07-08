const path = require('path');
const fs = require('fs');

const types = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '..', '..', 'assets', 'type-list.json'),
    'utf8'
  )
);

const now = new Date();

for (const key of Object.keys(types)) {
  types[key].created_at = now;
  types[key].updated_at = now;
}

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('types', types, {}),

  down: queryInterface => queryInterface.bulkDelete('types', null, {}),
};
