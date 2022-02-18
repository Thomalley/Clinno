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
        // MP 👇
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "consulta"
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'Descripción vacía'
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2000
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        img: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 0
        },

    });

};