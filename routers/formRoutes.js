const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/forms/submit", requireLogin, async (req, res) => {
    const { form, name } = req.body;
    const obj = {
      form,
      name,
      dateCreated: new Date(),
      lastEdited: new Date(),
    };
    req.user.formDrafts.push(obj);
    const user = await req.user.save();
    console.log(user);
    res.send(user);
  });

  app.post("/api/forms/update", requireLogin, async (req, res) => {
    const { form, id } = req.body;
    const forms = req.user.formDrafts;
    var index = forms.findIndex((item) => item.id === id);
    const newForm = forms[index];
    newForm.lastEdited = new Date();
    newForm.form = form;
    req.user.formDrafts.splice(index, 1, newForm);
    console.log(index, newForm);
    const user = await req.user.save();
    res.send(user);
  });

  app.post("/api/forms/delete", requireLogin, async (req, res) => {
    console.log(req.body);
    var index = req.user.formDrafts.findIndex(
      (item) => item.id === req.body._id
    );
    console.log(index);
    console.log(req.user.formDrafts);
    if (index > -1) {
      req.user.formDrafts.splice(index, 1);
      console.log("Deleted");
      const user = await req.user.save();
      res.send(user);
    } else res.send(req.user);
  });
};
