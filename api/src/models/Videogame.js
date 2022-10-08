const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
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
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  });
};
