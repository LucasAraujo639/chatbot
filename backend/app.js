// Importa la configuración de la aplicación desde el archivo "config.js" en la carpeta "utils".
const config = require("./utils/config");

// Importa el framework Express, que facilita la creación de servidores web en Node.js.
const express = require("express");

// Importa el módulo "express-async-errors", que permite manejar errores asíncronos en rutas de Express.
require("express-async-errors");

// Crea una instancia de Express, que es la aplicación principal.
const app = express();
//Cargar el front
//app.use(express.static('dist'))
// Importa el middleware "cors", que permite habilitar el CORS (Cross-Origin Resource Sharing) para manejar solicitudes desde otros dominios.
const cors = require("cors");


// Importa los routers para manejar rutas específicas en la aplicación.
const usersRouter = require("./controllers/users");
const contactosRouter = require("./controllers/contactos");
const loginRouter = require("./controllers/login");

// Importa middleware personalizado desde el archivo "middleware.js" en la carpeta "utils".
const middleware = require("./utils/middleware");

// Importa un módulo personalizado para registrar mensajes de logging en la aplicación.
const logger = require("./utils/logger");

// Importa Mongoose, que es una biblioteca de modelado de objetos para MongoDB, utilizada para interactuar con bases de datos MongoDB.
const mongoose = require("mongoose");

// Registra un mensaje en los logs indicando que está intentando conectar a MongoDB.
logger.info("connecting to MongoDB");

// Se conecta a la base de datos MongoDB utilizando la URI especificada en la configuración.
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    // Si la conexión es exitosa, se registra un mensaje en los logs indicando que la conexión fue establecida.
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    // Si ocurre un error durante la conexión, se registra un mensaje de error en los logs.
    logger.error("error connecting to MongoDB:", error.message);
  });

// Usa el middleware CORS para permitir solicitudes desde otros dominios.
app.use(cors());

// Usa el middleware de Express para parsear cuerpos de solicitudes en formato JSON.
app.use(express.json());

// Usa un middleware personalizado que registra cada solicitud HTTP en los logs.
app.use(middleware.requestLogger);

// Usa un middleware personalizado que extrae el token de autenticación de las solicitudes entrantes.
app.use(middleware.tokenExtractor);

// Define las rutas para el manejo de usuarios, contactos y logins, utilizando los routers importados.
// El middleware "userExtractor" se aplica a las rutas de contactos para asegurar que el usuario esté autenticado.
app.use("/api/users", usersRouter);
app.use("/api/contactos", middleware.userExtractor, contactosRouter);
app.use("/api/login", loginRouter);

// Si la aplicación está en modo de prueba ("test"), carga y usa un router especial para pruebas.
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

// Usa un middleware personalizado para manejar las solicitudes a rutas desconocidas.
app.use(middleware.unknownEndpoint);

// Usa un middleware personalizado para manejar errores en la aplicación.
app.use(middleware.errorHandler);


// Exporta la instancia de la aplicación para que pueda ser utilizada en otros archivos, como el servidor HTTP.
module.exports = app;
