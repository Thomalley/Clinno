const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('order', {
        //Mercado pago 👇
        payment_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        clinicaId:{
            type: DataTypes.STRING,
            allowNull: false
        },
        // orderID: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        merchant_order_id: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('created', 'processing', 'cancelled', 'completed'),
            allowNull: false,
            defaultValue: 'created'
        },
    });

};