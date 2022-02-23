const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {

    sequelize.define('resenia', {
        comentario: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        calificacionDoctor: {
            type: DataTypes.INTEGER, //( "1", "2", "3", "4", "5", ),
            allowNull: true,
        },

        calificacionClinica: {
            type: DataTypes.INTEGER, //( "1", "2", "3", "4", "5", ),
            allowNull: true,
        },

        calificacionClinno: {
            type: DataTypes.INTEGER, //( "1", "2", "3", "4", "5", ),
            allowNull: true,
        },

        reviewed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        idTurno: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    });
};