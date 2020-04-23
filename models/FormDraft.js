const mongoose = require("mongoose");
const { Schema } = mongoose;

const formDraftSchema = new Schema({
  name: {
    type: String,
  },
  form: { type: String },
});

module.exports = formDraftSchema;
