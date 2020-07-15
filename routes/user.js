const { requireAuth } = require('../middlewares');
const { Profile } = require('../db').models;

async function getProfile(req, res, next) {
  try {
    let profile = await Profile.findByPk(req.user.id, {
      attributes: { exclude: ['user_id', 'created_at', 'updated_at'] },
    });
    if (!profile) {
      profile = {};
    }

    res.send(profile);
  } catch (err) {
    next(err);
  }
}

async function editProfile(req, res, next) {
  let { first_name, last_name, pob, phone, id_type, id_num } = req.body;

  const errors = {};
  if (!(typeof first_name === 'string' && first_name.trim())) {
    errors.first_name = 'Provide first name';
  }

  if (!(typeof last_name === 'string' && last_name.trim())) {
    errors.last_name = 'Provide last name ';
  }

  if (!(typeof pob === 'string' && pob.trim())) {
    errors.pob = 'Provide place of birth ';
  }

  if (!(typeof phone === 'string' && phone.trim())) {
    errors.phone = 'Provide phone number';
  }

  if (!(typeof id_type === 'string' && id_type.trim())) {
    errors.id_type = 'Select ID type';
  }

  if (!(typeof id_num === 'string' && id_num.trim())) {
    errors.id_num = 'Provide id number';
  }

  if (Object.keys(errors).length) {
    return res.status(400).send({ error: errors });
  }

  try {
    let profile = await Profile.findByPk(req.user.id);
    if (!profile) {
      profile = new Profile({ user_id: req.user.id });
    }
    profile.first_name = first_name.trim();
    profile.last_name = last_name.trim();
    profile.pob = pob.trim();
    profile.phone = phone.trim();
    profile.id_type = id_type.trim();
    profile.id_num = id_num.trim();

    await profile.save();
    res.send({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = (app) => {
  app.get('/user/profile', requireAuth, getProfile);
  app.post('/user/profile', requireAuth, editProfile);
};
