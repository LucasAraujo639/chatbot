const config = require("../utils/config");
const contactosRouter = require("express").Router();
const Contacto = require("../models/contacto");
const jwt = require("jsonwebtoken");

//Obitene todos los contactos
contactosRouter.get("/", async (request, response) => {
  const contactos = await Contacto.find({}).populate("user", { username: 1, name: 1 });
  response.json(contactos);
});

// Obitene un contacto con un id en particular
contactosRouter.get("/:id", async (request, response) => {
  const contacto = await Contacto.findById(request.params.id);

  if (contacto) {
    response.json(contacto.toJSON());
  } else {
    response.status(404).end();
  }
});

//postea un contacto si esta autentificado(osea que tiene token en el header de la peticion http)
contactosRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;
  const token = request.token;

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!(token && decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const contacto = await new Contacto({
    nombre: body.nombre,
    numero: body.numero,
    user: user._id,
  }).populate("user", { username: 1, name: 1 });

  const savedContacto = await contacto.save();

  user.contactos = user.contactos.concat(savedContacto._id);
  await user.save();

  response.status(201).json(savedContacto.toJSON());
});

//eliminar contacto
contactosRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const user = request.user;
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!(token && decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const id = request.params.id;
  const contacto = await Contacto.findById(id);

  if (contacto.user.toString() === user.id.toString()) {
    await Contacto.deleteOne({ _id: id });
    response.sendStatus(204).end();
  } else {
    response.status(401).json({ error: "unauthorized operation" });
  }
});

//acutalizar contacto
// contactosRouter.put("/:id", async (request, response) => {
//   const contacto = request.body;
//   const id = request.params.id;

//   const updatedContacto = await Contacto.findByIdAndUpdate(id, contacto, {
//     new: true,
//   }).populate("user", { username: 1, name: 1 });

//   updatedContacto
//     ? response.status(200).json(updatedContacto.toJSON())
//     : response.status(404).end();
// });

module.exports = contactosRouter;
