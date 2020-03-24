const passport = require("passport");

//first if user is not authenticated then the site redirects to google sign in page
//then the user is redirected to callback URL with a special code in the query string
//which is used to get more info about user

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    }),
    (req, res) => {
      res.send("Hello world");
    }
  );

  //google callback url , then only difference bw this and the above url is tht
  //in this router the query string contains a code which can be used to get info bout user

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.send("Hello world");
    }
  );
  //kills the id in the cookie
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current", (req, res) => {
    res.send(req.user);
  });

  //Flow of the app
  //   1.When the user logs in , a cookie is assigned with a token and the users Id.When
  //   2.When the browser requests an incoming get/putch/put route(ex-/api/current),the cookie
  //    is recieved by the cookie session and passport assigns it to the
  //    req.session prop which contains the user id.
  //   3.Then this is passed to the deserialize user which gets the entire user from just the id.

  //   to use cookie based auth , 2 types of sessions available: cookie session and express session
  //   data size limit of cookie in cookie session is 14kb , while in express it is stored in another
  //   server and called when required
};
