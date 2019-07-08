import Type from '../models/Type';

export default async function(pokemons) {
  if (!pokemons.length) pokemons = [pokemons];

  const allTypes = [];

  await Type.findAll({
    where: {},
    attributes: ['id', 'type', 'color'],
  }).then(foundTypes => {
    for (const type of foundTypes) allTypes.push(type.dataValues);
  });

  for (const index in pokemons) {
    const pokemon = pokemons[index].dataValues;

    const type = [];

    for (const typeId of pokemon.type) {
      const typeData = allTypes.find(t => t.id === typeId);

      if (!typeData) continue;

      const { type: label, color } = typeData;

      type.push({ id: typeId, type: label, color });
    }

    pokemon.type = type;

    pokemons[index].dataValues = pokemon;
  }

  return pokemons;
}
