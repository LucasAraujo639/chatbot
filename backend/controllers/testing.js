const testingRouter = require("express").Router();
const Contacto = require("../models/contacto");
const User = require("../models/user");

testingRouter.post("/reset", async (request, response) => {
  await Contacto.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
