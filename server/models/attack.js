const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attackSchema = new Schema({
  name: String,
  link: String,
  positionId: String,
});

module.exports = mongoose.model('Attack', attackSchema)