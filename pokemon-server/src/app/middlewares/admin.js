import User from '../models/User';

export default async (req, res, next) => {
  const isAdmin = await User.findOne({
    where: { id: req.userId, admin: true },
  });
  if (!isAdmin)
    return res.status(401).json({ error: 'You are not an administrator' });
  return next();
};
