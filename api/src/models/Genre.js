const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genre', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        source: {
            type: DataTypes.ENUM("API", "ID"),
            allowNull: false,
            // primaryKey: true
        }
    },{
        timestamps: false
    })
}