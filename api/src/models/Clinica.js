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
      type: DataTypes.STRING
    },
    mail:{
      type: DataTypes.STRING
    },
    password:{
      type: DataTypes.STRING
    },
    codigo:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombreEn: {
     type: DataTypes.STRING
    },
    apellidoEn: {
      type: DataTypes.STRING
    },
    DNIEn: {
      type: DataTypes.STRING
    },
    hablitada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    baja: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};