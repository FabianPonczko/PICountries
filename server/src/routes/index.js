const { Router } = require('express');
// Importar todos los routers;
const countriesRouter = require("./countriesRoutes")
const activitiesRouter = require("./activitiesRoutes");
const continentsRouter = require('./continentsRouter');




const router = Router();

// Configurar los routers
router.use("/countries", countriesRouter); /////Esta linea indica la ruta url cuando la ingresen que debe hacer 
/// y donde  en este caso a countriesrouter , donde estas las routas definidas 
router.use("/activities", activitiesRouter);

router.use("/continents", continentsRouter)


module.exports = router;
