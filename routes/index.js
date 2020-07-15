const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client({
  clientId:
    '18048296876-22h5tf7jk6vbha5cbec0063e9qf86lfb.apps.googleusercontent.com',
});
const { User } = require('../db').models;

async function login(req, res) {
  const { token } = req.body;
  if (!(typeof token === 'string' && token.trim()))
    return res.status(400).send({ error: 'Request failed' });

  try {
    const ticket = await client.verifyIdToken({ idToken: token });
    const { sub: id, email } = ticket.getPayload();

    let user = await User.findByPk(id);
    if (!user) {
      user = await User.create({ id, email });
    }

    const jwtToken = jwt.sign({ id }, process.env.JWT_SECRET);
    res.send({ token: jwtToken });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Request failed' });
  }
}

router.post('/auth/login', login);

module.exports = router;
