const mongoose = require("mongoose");

const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  numero: {
    type: String,
    required: true,
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

contactoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contacto", contactoSchema);
