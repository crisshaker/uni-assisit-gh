const jwt = require('jsonwebtoken');
const { User } = require('../db').models;

module.exports.requireAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).send({ error: 'You must be logged in' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async function (err, payload) {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in' });
    }

    try {
      const user = await User.findByPk(payload.sub);
      if (!user) {
        return res.status(401).send({ error: 'You must be logged in' });
      }

      req.user = user.toJSON();
      next();
    } catch (err) {
      next(err);
    }
  });
};
