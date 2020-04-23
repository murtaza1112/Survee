const mongoose = require("mongoose");
const { Schema } = mongoose;
const formDraftSchema = require("./FormDraft");

const UserSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0,
  },
  formDrafts: [formDraftSchema],
});
//dont add a list of surveys to each user as
//each collection gets a 4mb max size to hold its records
//so each User can only store bout 4mb pof size whihc is roughly equal to 200k emails.
//so a user can send only 200K emails for all rhe surveys
//but if each survey has its own record then 200k emails per survey
//which would be more than fitting for us.
mongoose.model("users", UserSchema);
