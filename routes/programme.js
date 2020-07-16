const { sequelize, models } = require('../db');
const { Application } = models;
const { requireAuth } = require('../middlewares');

async function getAdmissions(req, res, next) {
  try {
    const [admissions] = await sequelize.query(
      `
      SELECT admissions.id, schools.name AS school, admissions.title FROM admissions
      JOIN schools ON admissions.school_id = schools.id
    `
    );

    res.send(admissions);
  } catch (err) {
    next(err);
  }
}

async function getProgrammesForAdmission(req, res, next) {
  try {
    const [programs] = await sequelize.query(
      `
      SELECT programmes.id, programmes.title FROM admissions
      JOIN admissionprogrammes ON admissions.id = admissionprogrammes.admission_id
      JOIN programmes ON admissionprogrammes.programme_id = programmes.id
      WHERE admissions.id = :id
    `,
      { replacements: { id: req.params.id } }
    );

    res.send(programs);
  } catch (err) {
    next(err);
  }
}

async function applyForAdmission(req, res, next) {
  const { id } = req.params;
  const [programme_1, programme_2, programme_3] = req.body.programmes;

  try {
    let application = await Application.findOne({
      where: { user_id: req.user.id, admission_id: id },
    });

    if (!application) {
      application = Application.build({
        user_id: req.user.id,
        admission_id: id,
      });
    }

    application.programme_1 = programme_1;
    application.programme_2 = programme_2;
    application.programme_3 = programme_3;

    await application.save();

    res.send({ success: true });
  } catch (err) {
    next(err);
  }
}

async function getMyApplications(req, res, next) {
  try {
    const [applications] = await sequelize.query(
      `
    SELECT admissions.id, schools.name AS school, admissions.title FROM users
    JOIN applications ON users.id = applications.user_id
    JOIN admissions ON applications.admission_id = admissions.id
    JOIN schools ON admissions.school_id = schools.id
    WHERE users.id = :user
    `,
      { replacements: { user: req.user.id } }
    );

    res.send(applications);
  } catch (err) {
    next(err);
  }
}

module.exports = (app) => {
  app.get('/admissions', requireAuth, getAdmissions);
  app.get('/admissions/:id/programmes', requireAuth, getProgrammesForAdmission);
  app.post('/admissions/:id/applications', requireAuth, applyForAdmission);
  app.get('/applications', requireAuth, getMyApplications);
};
