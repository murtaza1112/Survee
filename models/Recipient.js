const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
  responded: { type: String },
  dateSubmitted: Date,
});

module.exports = recipientSchema;
