// Carga las variables de entorno desde un archivo .env al proceso en Node.js.
// Esto permite que las variables de entorno definidas en .env estén disponibles en process.env.
require("dotenv").config();

// Asigna la variable de entorno PORT a una constante.
// Esto se utiliza para definir en qué puerto se ejecutará la aplicación.
const PORT = process.env.PORT;

// Asigna la variable de entorno MONGODB_URI a una constante.
// Esta variable contiene la cadena de conexión a la base de datos MongoDB.
const MONGODB_URI = process.env.MONGODB_URI;

// Asigna la variable de entorno SECRET a una constante.
// Este "SECRET" se utiliza comúnmente para firmar y verificar JSON Web Tokens (JWT).
const SECRET = process.env.SECRET;

// Exporta las constantes MONGODB_URI, PORT y SECRET para que puedan ser usadas en otros archivos.
// Esto permite que otros módulos de la aplicación accedan fácilmente a estas configuraciones.
module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
};
