// Importa el modelo de usuario desde el archivo "../models/user".
// Esto permite acceder a la base de datos de usuarios.
const User = require("../models/user");

// Importa un módulo de registro de eventos personalizado.
// `logger` se usa para registrar información, errores y mensajes de depuración.
const logger = require("./logger");

// Importa el módulo `jsonwebtoken` para trabajar con JSON Web Tokens (JWT).
// JWTs son usados para la autenticación de usuarios y manejo de sesiones.
const jwt = require("jsonwebtoken");

// Middleware para registrar detalles de cada solicitud HTTP.
// `requestLogger` registra el método HTTP, la ruta y el cuerpo de la solicitud, y luego llama a `next()` para continuar.
const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();  // Pasa el control al siguiente middleware en la cadena.
};

// Middleware para manejar rutas desconocidas (404).
// Si una solicitud llega a este punto, significa que la ruta no existe, y se responde con un error 404.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// Middleware para manejar errores de la aplicación.
// Este middleware atrapa diferentes tipos de errores y responde con mensajes adecuados.
// También registra el error para su posterior análisis.
const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });  // Error de formato de ID en MongoDB.
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });  // Error de validación de datos.
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });  // Error de token JWT inválido.
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "expired token" });  // Error de token JWT expirado.
  }

  logger.error(error.message);  // Registra el mensaje de error.

  next(error);  // Pasa el error al siguiente middleware, si lo hubiera.
};

// Middleware para extraer el token JWT de la cabecera de autorización de la solicitud.
// Si la cabecera existe y comienza con "bearer ", extrae el token y lo guarda en `request.token`.
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);  // Guarda el token JWT en la solicitud.
  }

  next();  // Pasa el control al siguiente middleware.
};

// Middleware para extraer el usuario basado en el token JWT.
// Decodifica el token, encuentra al usuario en la base de datos, y lo adjunta a la solicitud.
const userExtractor = async (request, response, next) => {
  const token = request.token;
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);  // Verifica y decodifica el token.
    const user = await User.findById(decodedToken.id);  // Busca al usuario en la base de datos usando el ID del token.
    request.user = user;  // Añade el usuario a la solicitud.
  }

  next();  // Pasa el control al siguiente middleware.
};

// Exporta las funciones middleware para que puedan ser usadas en otras partes de la aplicación.
// Esto permite que los controladores y el servidor utilicen estas funciones para gestionar las solicitudes.
module.exports = {
  requestLogger,    // Para registrar las solicitudes.
  unknownEndpoint,  // Para manejar rutas no encontradas.
  errorHandler,     // Para manejar errores de la aplicación.
  tokenExtractor,   // Para extraer el token JWT de la solicitud.
  userExtractor,    // Para extraer el usuario autenticado basado en el token JWT.
};
