const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('doctor', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disponibildad:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
    

  });
};



