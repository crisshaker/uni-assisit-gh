const { Profile } = require('../db').models;
const { requireAuth } = require('../middlewares');

async function hasProfile(req, res, next) {
  try {
    const hasProfile = await Profile.findOne({ user_id: req.user.id });
    res.send({ result: hasProfile ? true : false });
  } catch (err) {
    next(err);
  }
}

module.exports = (app) => {
  app.get('/query/user/has-profile', requireAuth, hasProfile);
};
