const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('clinica', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
        type: DataTypes.STRING
    },
    direccion:{
      type: DataTypes.STRING
    },
    telefono:{
      type: DataTypes.INTEGER
    },
    mail:{
      type: DataTypes.STRING
    },
    constraseña:{
      type: DataTypes.STRING
    },
    nombreEn: {
     type: DataTypes.STRING
    },
    apellidoEn: {
      type: DataTypes.STRING
    },
    DNIEn: {
      type: DataTypes.STRING
    }
  });
};