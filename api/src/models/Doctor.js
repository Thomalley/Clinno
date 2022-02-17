const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('doctor', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    codigo:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dni:{
      type: DataTypes.STRING
    },
    email:{
      type: DataTypes.STRING
    },
  });
};



