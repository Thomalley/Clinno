const { DataTypes, Sequelize, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
// defino el modelo
 sequelize.define('cliente', {
  nombre: {
     type: DataTypes.STRING,
     allowNull: false,
  },
  apellido: {
     type: DataTypes.STRING,
     allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: 'No es una dirección de correo electrónico.'
          }
        },
        allowNull: false,
        unique: true

    }, dirrecion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    idTurnos: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  

});
};