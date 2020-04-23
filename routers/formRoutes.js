const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/forms/submit", requireLogin, async (req, res) => {
    req.user.formDrafts.push(req.body);
    const user = await req.user.save();
    res.send(user);
  });
};
