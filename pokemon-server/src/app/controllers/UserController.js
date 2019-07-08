import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nickname: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const userExists = await User.findOne({
      where: { nickname: req.body.nickname },
    });

    if (userExists)
      return res.status(400).json({ error: 'User already exists' });

    const { id, nickname, admin } = await User.create(req.body);

    return res.json({
      id,
      nickname,
      admin,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nickname: Yup.string(),
      admin: Yup.bool(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { nickname, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    // Prevents duplicating e-mails
    if (nickname !== user.nickname) {
      const userExists = await User.findOne({ where: { nickname } });

      if (userExists)
        return res.status(400).json({ error: 'Nick already exists' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword)))
      return res.status(401).json({ error: 'Password does not match' });

    const { id, admin } = await user.update(req.body);

    return res.json({
      id,
      nickname,
      admin,
    });
  }
}

export default new UserController();
