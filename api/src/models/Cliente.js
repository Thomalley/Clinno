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

    }, direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
});
};