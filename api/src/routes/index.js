const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRoute = require("./recipe.js")
const typesRoute = require("./types.js")
const router = Router();
router.use("/recipes", recipesRoute)
router.use("/types", typesRoute)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
