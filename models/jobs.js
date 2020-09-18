// Creating our Jobs model
module.exports = function(sequelize, DataTypes) {
  const Jobs = sequelize.define("Jobs", {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
        isAlpha: {
          msg: "Name should only contain letters"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 1000]
      }
    },
    technology: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z]+$/i
      }
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jobtype: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Full-Time", "Part-Time"]]
      }
    },
    salary: {
      type: DataTypes.DOUBLE
    },
    joblocation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
        isAlpha: {
          msg: "Name should only contain letters"
        }
      }
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User", // 'User' refers to table name
        key: "id" // 'id' refers to column name in User table
      }
    }
  });

  return Jobs;
};
