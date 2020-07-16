const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  class Profile extends Model {}
  Profile.init(
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: { model: User, key: 'id' },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pob: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_num: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'profiles',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  class School extends Model {}
  School.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'schools',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  class Programme extends Model {}
  Programme.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      school_id: {
        type: DataTypes.INTEGER,
        references: { model: School, key: 'id' },
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'programmes',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  class Admission extends Model {}
  Admission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      school_id: {
        type: DataTypes.INTEGER,
        references: { model: School, key: 'id' },
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'admissions',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  class AdmissionProgramme extends Model {}
  AdmissionProgramme.init(
    {
      admission_id: {
        type: DataTypes.INTEGER,
        references: { model: Admission, key: 'id' },
        primaryKey: true,
      },
      programme_id: {
        type: DataTypes.INTEGER,
        references: { model: Programme, key: 'id' },
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: 'admissionprogrammes',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  class Application extends Model {}
  Application.init(
    {
      user_id: {
        type: DataTypes.STRING,
        references: { model: User, key: 'id' },
        primaryKey: true,
      },
      admission_id: {
        type: DataTypes.INTEGER,
        references: { model: Admission, key: 'id' },
        primaryKey: true,
      },
      programme_1: {
        type: DataTypes.INTEGER,
        references: { model: Programme, key: 'id' },
        allowNull: false,
      },
      programme_2: {
        type: DataTypes.INTEGER,
        references: { model: Programme, key: 'id' },
        allowNull: false,
      },
      programme_3: {
        type: DataTypes.INTEGER,
        references: { model: Programme, key: 'id' },
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'applications',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return {
    User,
    Profile,
    School,
    Programme,
    Admission,
    AdmissionProgramme,
    Application,
  };
};
