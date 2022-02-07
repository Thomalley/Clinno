const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const calendarioRouter = require('./calendario.js');
const clienteRouter = require('./cliente.js');
const diagnosticoRouter = require('./diagnostico.js');
const mercadoPagoRouter = require('./mercadoPago.js');
const reseñaRouter = require('./reseña.js');
const turnoRouter = require('./turno.js');
const doctorRouter = require('./doctor.js');
const especialidadRouter = require('./especialidad.js');
const clinicaRouter = require('./clinica.js')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/calendario", calendarioRouter);
router.use("/cliente", clienteRouter);
router.use("/diagnostico", diagnosticoRouter);
router.use("/calendario", calendarioRouter);
router.use("/mercadoPago", mercadoPagoRouter);
router.use("/reseña", reseñaRouter);
router.use("/turno", turnoRouter);
router.use("/doctor", doctorRouter);
router.use("/especialidad", especialidadRouter);
router.use("/clinica", clinicaRouter)
module.exports = router;
