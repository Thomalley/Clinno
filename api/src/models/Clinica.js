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
   // MP 👇
    //  name: {
    //    type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: "consulta"
    // },
    // description: {
    //     type: DataTypes.TEXT,
    //     allowNull: false,
    //     defaultValue: 'Descripción vacía'
    // },
    // price: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     defaultValue: 2000
    // },
    // stock: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     defaultValue: 1
    // },
    // img: {
    //     type: DataTypes.TEXT,
    //     allowNull: false,
    //     defaultValue: 0
    // },
  
  });
};