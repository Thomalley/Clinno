const { DataTypes, Sequelize, UUIDV4 } = require('sequelize');


module.exports = (sequelize) => {

 sequelize.define('admin', {
 
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "admin"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "VPQjz42MtkSQz4G9"
    }
    });
};