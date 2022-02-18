const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('turno', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        fecha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hora: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idClinica: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dniCliente: {
            type: DataTypes.STRING,
        },
        idDoctor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idEspecialidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pendiente', 'concretado', 'cancelado'),
            allowNull: false,
            defaultValue: "pendiente"
        },
    });

};