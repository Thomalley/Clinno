require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/clinno`, {
//     logging: false,
//     native: false,
// });
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/clinno`,
        { logging: false, native: false }
      );
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Calendario, Cliente, Diagnostico, Doctor, Especialidad, Reseña, Turno, Clinica, Order, Order_detail } = sequelize.models;

// Mercado Pago👇
Cliente.hasMany(Order)
Order.belongsTo(Cliente)
Order.hasOne(Order_detail)
Turno.hasOne(Order_detail)
Order_detail.belongsTo(Turno)


Doctor.belongsToMany(Especialidad, {
    through: "Doctor_Esp",
});
Especialidad.belongsToMany(Doctor, {
    through: "Doctor_Esp",
});
Doctor.belongsToMany(Clinica, {
    through: "Doctor_Clinica",
});
Clinica.belongsToMany(Doctor, {
    through: "Doctor_Clinica",
});
Clinica.belongsToMany(Especialidad, {
    through: "Espe_Clinica",
});
Especialidad.belongsToMany(Clinica, {
    through: "Espe_Clinica",
});
module.exports = {
    ...sequelize.models,
    conn: sequelize,
};