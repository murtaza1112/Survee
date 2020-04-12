const express = require("express");
const keys = require("./config/keys");
const authRoutes = require("./routers/authrouter");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const billingRoutes = require("./routers/billingRoutes");
const surveyRoutes = require("./routers/surveyRoutes");
require("./models/User");
require("./models/Survey");
require("./services/passport");

const PORT = process.env.PORT || 5000;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
//express middlewares
//body parser to get body of returned posts requests if any and will assign responsen to req.body
app.use(bodyParser.json());

//to inform passport to use cookie based auth
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //token expires after 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
//end of middlewares
authRoutes(app);
billingRoutes(app);
surveyRoutes(app);
//another alternative to about code is
//require("./routers/authrouter")(app);
//the require function returns function to which the app object is passed

if (process.env.NODE_ENV === "production") {
  //only in prod version
  //if route for a particular route not recognized on server side
  //then check in client side
  app.use(express.static("client/build"));
  //Express will serve up the index.html file
  //if it dosent recognize the route even on  client side
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("The server is active on:", PORT);
});
