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
    idCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idDoctor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idEspecialidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // estado: {
    //   type: DataTypes.ENUM('abierto', 'creado', 'proceso', 'cancelado', 'completado'),
    //   allowNull: false
    // },
    //Mercado pago 👇
    payment_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    payment_status: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    merchant_order_id: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    }
  });

};



