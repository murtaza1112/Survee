const express = require("express");
const keys = require("./config/keys");
const authRoutes = require("./routers/authrouter");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./models/User");
require("./services/passport");

const PORT = process.env.PORT || 3000;
mongoose.connect(keys.mongoURI);

const app = express();

//to inform passport to use cookie based auth
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //token expires after 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
//another alternative to about code is
//require("./routers/authrouter")(app);
//the require function returns function to which the app object is passed

app.listen(PORT, () => {
  console.log("The server is active on:", PORT);
});
