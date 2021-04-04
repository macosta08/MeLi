const express = require("express");
const cors = require("cors");

//Las siguientes 2 lineas requeridas para usar SWAGGER
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());

app.listen(PORT, () => {
  console.log(`Escuchando sobre el puerto ${PORT}`);
});

//Ruta donde se verá la documentación
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

require("./endpoints")(app);
