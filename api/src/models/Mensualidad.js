const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('mensualidad', {
        unit_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2000
        },
        clinicaId:{
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

};