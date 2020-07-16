require('dotenv').config();

const { sequelize, models } = require('./db');
const { School, Programme, Admission, AdmissionProgramme } = models;

const data = {
  schools: [
    {
      name: 'University of Ghana (UG), Legon',
    },
    {
      name: 'Kwame Nkrumah University of Science & Technology (KNUST)',
    },
    {
      name: 'Ashesi University',
    },
  ],
  programmes: [
    'BSc. Information Technology',
    'BSc. Business Administration',
    'BSc. Computer Science',
    'BSc. Computer Engineering',
    'BA. Psychology',
  ],
  admissions: ['2020 Admissions', '2021 Post-graduate Admissions'],
};

sequelize
  .authenticate()
  .then(async () => {
    console.log('SUCCESS: Database connection');
    await sequelize.sync({ force: true });
    console.log('SUCCESS: Database sync');

    // Seed here
    const schools = await School.bulkCreate(data.schools);
    for (const school of schools.map((school) => school.toJSON())) {
      const programmes = await Programme.bulkCreate(
        data.programmes.map((title) => ({ title, school_id: school.id }))
      );

      const admissions = await Admission.bulkCreate(
        data.admissions.map((title) => ({ title, school_id: school.id }))
      );
      for (const admission of admissions.map((a) => a.toJSON())) {
        for (const programme of programmes.map((p) => p.toJSON())) {
          await AdmissionProgramme.create({
            admission_id: admission.id,
            programme_id: programme.id,
          });
        }
      }
    }

    const admissionPrograms = await AdmissionProgramme.findAll();
    console.log(admissionPrograms.map((a) => a.toJSON()));

    sequelize.close();
  })
  .catch((err) => console.log('ERROR: Database connection', err));
