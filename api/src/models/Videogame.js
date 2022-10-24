const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false
    },
    launch_date:{
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 5,
      validate: {
        min: 0,
        max: 5
      }
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    source: {
      type: DataTypes.ENUM('api','db'),
      defaultValue: 'db'
    }
  },
  {
    timestamps: false
  });
};
