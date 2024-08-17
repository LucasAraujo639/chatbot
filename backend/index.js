// Importa la configuración de la aplicación desde el archivo "app.js".
const app = require("./app");

// Importa el módulo HTTP nativo de Node.js, que se utiliza para crear servidores web.
const http = require("http");

// Importa un archivo de configuración, donde se espera que esté definida la configuración del puerto, entre otras cosas.
const config = require("./utils/config");

// Importa un módulo de logging personalizado para registrar mensajes e información sobre la ejecución del servidor.
const logger = require("./utils/logger");

// Crea un servidor HTTP utilizando la aplicación Express importada.
// El servidor usará la lógica definida en `app` para manejar las solicitudes entrantes.
const server = http.createServer(app);

//-----Socket.io------------
const { Server: SocketServer } = require('socket.io');

const io = new SocketServer(server,{
  cors:{
    origin:"http://localhost:5173"
  }
});

//-------------------------

//---------------------------------------------------------------------------------------------
//-------------------- whatsapp-web.js --------------------------------------------------------
//---------------------------------------------------------------------------------------------
let listaContactos = [];
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client();
let qrValue = ''; // Variable global para almacenar el valor del QR
client.on('qr', (qr) => {
    // Generar qr y escanearlo con el telefono
    qrValue = qr;
    //esto lo podemos borrar ya que no necesitamos mas el qr en la terminal
    qrcode.generate(qr, {small: true}); 
  
});
//Cuando pase una coneccion vas a recibir un socket
io.on('connection', (socket) =>{
  console.log('Cliente Conectado al Socket');

  //Escucha el eventoObtenerQr y emite otro evento que lo va a estar escuchando el front llamado qrValue
  socket.on('eventoObtenerQR', () => {
    socket.emit('qrValue',qrValue)
    socket.disconnect(true);
    console.log('Socket desconectado después de enviar QR');
  })
})

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
  //Manejamos contactos desconocidos
  const contact = await msg.getContact();
    console.log("el contacto backend es: ", contact)
    // Verifica si el remitente está guardado en tus contactos
    const isSavedInContacts = contact.isMyContact;
    console.log("Lo tengo en mis contactos Guardados?", isSavedInContacts)
    console.log("nombre: ", contact.name)
    console.log("numero del contacto: ", contact.number)
    console.log("body del mensaje", msg.body)

    io.on('connection', (socket)=>{
      console.log('Cliente Conectado al Socket MSG');
    
    if (!isSavedInContacts) {
      //En realidad le tengo que madnar el front la info para que lo agregue a la lista de contactos
        socket.emit('AgregarContactoAlChatbot',[contact.name,contact.number])
        console.log(`Mensaje recibido de un contacto desconocido: ${contact.number}`);
        console.log(`Mensaje: ${msg.body}`);
    } else {
      //interactuo normalmente
        console.log(`Mensaje recibido de un contacto guardado: ${contact.name}`);
        console.log(`Mensaje: ${msg.body}`);
    }
  })

  //Aca tenemos que abrir un socket para mandar el contacto haber si el el tio lo quiere guardar a la lista de redireccion hacia el chatbot
  //Del front cuando lo agreguemos hacemos el llamado a un socket con client on personalizado que va a mandarle un flujo principal al contacto
  if (!contact.isMyContact) {
    handleContactoDesconocido(msg, contact);
  }

  if (msg.body.toLowerCase().includes('hola')) {
    handleFlujoPrincipal(msg);
  }


  // Añade aquí más condiciones y llamadas a funciones según necesites
});

function handleContactoDesconocido(msg, contact) {
  console.log(`Mensaje de contacto desconocido: ${contact.number}`);
  // Lógica específica para manejar mensajes de contactos desconocidos
}

function handleFlujoPrincipal(msg) {
  msg.reply('¡Hola! ¿Cómo puedo ayudarte?');
  // Lógica específica para manejar saludos
}


client.initialize();

//-------------------------------------------------------------------------------------------------


// El servidor empieza a escuchar peticiones en el puerto definido en `config.PORT`.
// Una vez que el servidor comienza a escuchar, se ejecuta el callback, que usa el logger para registrar un mensaje informando que el servidor está funcionando.
server.listen(config.PORT, () => {
  // Registra en los logs que el servidor está corriendo en el puerto especificado en `config.PORT`.
  logger.info(`Server running on port ${config.PORT}`);
});
