const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diagnostico', {
    // id: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     primaryKey: true,
    //     defaultValue: DataTypes.UUIDV4,
    //   },
    sintomas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    indicaciones:{
      type: DataTypes.STRING,
    },
    estudio:{
      type: DataTypes.STRING,
    },
    diagnostico: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    idTurno: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};