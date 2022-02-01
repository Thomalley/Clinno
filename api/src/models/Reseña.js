const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {

   sequelize.define('reseña',{
   comentario: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
   calificacion: {
    type: DataTypes.INTEGER,  //( "1", "2", "3", "4", "5", ),
    allowNull: true,
   },

  });
};