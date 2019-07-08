import * as Yup from 'yup';

import { Op } from 'sequelize';

import Type from '../models/Type';

class TypeController {
  async index(req, res) {
    const where = {};

    if (req.query.search) {
      const { search } = req.query;

      where.type = { [Op.like]: `%${search}` };
    }

    const types = req.query.id
      ? await Type.findByPk(req.query.id)
      : await Type.findAll({
          where,
        });

    return res.json(types);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string()
        .max(20)
        .required(),
      color: Yup.string()
        .max(25)
        .required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    req.body.type = req.body.type.toLowerCase().trim();
    req.body.color = req.body.color.toLowerCase().trim();

    const { type, color } = req.body;

    const typeExists = await Type.findOne({ where: { type } });

    if (typeExists)
      return res.status(400).json({ error: 'Type already exists' });

    const colorExists = await Type.findOne({ where: { color } });

    if (colorExists)
      return res.status(400).json({ error: 'Color already exists' });

    const lastType = await Type.findOne({
      order: [['id', 'DESC']],
    });

    if (lastType) req.body.id = lastType.id + 1;

    const { id } = req.body;

    const newType = await Type.create({ id, type, color });

    return res.json(newType);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().max(20),
      color: Yup.string().max(25),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    if (req.body.type) req.body.type = req.body.type.toLowerCase().trim();
    if (req.body.color) req.body.color = req.body.color.toLowerCase().trim();

    const type = await Type.findByPk(req.params.id);

    if (!type) return res.status(404).json({ error: 'Type does not exists' });

    const newType = await type.update(req.body);

    return res.json(newType);
  }

  async delete(req, res) {
    const type = await Type.findByPk(req.params.id);

    if (!type) return res.status(404).json({ error: 'Type does not exists' });

    await type.destroy(req.body);

    return res.send();
  }
}

export default new TypeController();
