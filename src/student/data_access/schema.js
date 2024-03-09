const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  firstname: { type: String },
  lastname:  { type: String },
  email:     { type: String },
  age:       { type: Number },
  adress:    { type: String },
  ville:     { type: String },
  region:    { type: String },
  code_postal: { type: Number  },
  mother_names: { type: String },
  father_names: { type: String } 
});
