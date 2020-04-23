const mongoose = require("mongoose");
const { Schema } = mongoose;
const recipientSchema = require("./Recipient");
const formDraftSchema = require("./FormDraft");
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  draft: { formDraftSchema },
  dateSent: Date,
  lastResponded: Date,
  //a user reference , relationship
});

module.exports = mongoose.model("surveys", surveySchema);
