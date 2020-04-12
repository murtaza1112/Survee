const mongoose = require("mongoose");
const { Schema } = mongoose;
const recipientScehma = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientScehma],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date
  //a user reference , relationship
});

module.exports = mongoose.model("surveys", surveySchema);
