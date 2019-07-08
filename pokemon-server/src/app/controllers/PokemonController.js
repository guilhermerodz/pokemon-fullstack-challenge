import * as Yup from 'yup';

import { Op } from 'sequelize';

import Pokemon from '../models/Pokemon';

class PokemonController {
  async index(req, res) {
    const where = {};
    let order = ['id', 'ASC']; // ASC, DESC
    const page = req.query.page || 1;
    const perPage = 10;

    if (req.query.field && req.query.order) {
      order = [req.query.field, req.query.order];
    }

    if (
      req.query.filterField &&
      req.query.filterOp &&
      req.query.filterValue !== undefined
    ) {
      const { filterField: field, filterOp: op } = req.query;
      let { filterValue: value } = req.query;

      if (req.query.filterValueType && req.query.filterValueType === 'number')
        value = Number(value);

      if (op === 'contains') where[field] = { [Op[op]]: [value] };
      else where[field] = { [Op[op]]: value };
    }

    const pokemons = await Pokemon.findAll({
      where,
      limit: perPage,
      offset: perPage * page - perPage,
      order: [order],
    });

    return res.json(pokemons);
  }

  async show(req, res) {
    const where = {
      pokedex: req.params.pokedex,
    };

    const pokemon = await Pokemon.findOne({ where });

    if (!pokemon)
      return res.status(400).json({ error: 'Pokemon does not exists' });

    return res.json(pokemon);
  }

  async store(req, res) {
    const yupInt = Yup.number()
      .positive()
      .integer();

    const schema = Yup.object().shape({
      pokedex: yupInt.required(),
      generation: yupInt.required(),
      name: Yup.string()
        .max(30)
        .required(),
      type: Yup.array(yupInt.required()).required(),
      height: Yup.number()
        .required()
        .positive(),
      weight: Yup.number()
        .required()
        .positive(),
      external_picture: Yup.string().required(),
      hp: yupInt.required(),
      attack: yupInt.required(),
      defense: yupInt.required(),
      spa: yupInt.required(),
      speed: yupInt.required(),
      previous_evolution: yupInt.nullable(),
      next_evolution: yupInt.nullable(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const pokemonExists = await Pokemon.findOne({
      where: { pokedex: req.body.pokedex },
    });

    if (pokemonExists)
      return res.status(400).json({ error: 'Pokemon already exists' });

    const lastPokemon = await Pokemon.findOne({
      order: [['id', 'DESC']],
    });

    if (lastPokemon) req.body.id = lastPokemon.id + 1;

    const pokemon = await Pokemon.create(req.body);

    return res.json(pokemon);
  }

  async update(req, res) {
    const yupInt = Yup.number()
      .positive()
      .integer();

    const schema = Yup.object().shape({
      generation: yupInt,
      name: Yup.string().max(30),
      type: Yup.array(yupInt.required()),
      height: Yup.number().positive(),
      weight: Yup.number().positive(),
      custom_picture: Yup.number()
        .positive()
        .integer()
        .nullable(),
      external_picture: Yup.string(),
      hp: yupInt,
      attack: yupInt,
      defense: yupInt,
      spa: yupInt,
      speed: yupInt,
      previous_evolution: yupInt.nullable(),
      next_evolution: yupInt.nullable(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const where = {
      pokedex: req.params.pokedex,
    };

    const pokemon = await Pokemon.findOne({ where });

    if (!pokemon)
      return res.status(400).json({ error: 'Pokemon does not exists' });

    const newPokemon = await pokemon.update(req.body);

    return res.json(newPokemon);
  }

  async delete(req, res) {
    const where = {
      pokedex: req.params.pokedex,
    };

    const pokemon = await Pokemon.findOne({ where });

    if (!pokemon)
      return res.status(400).json({ error: 'Pokemon does not exists' });

    await pokemon.destroy(req.body);

    return res.send();
  }
}

export default new PokemonController();
