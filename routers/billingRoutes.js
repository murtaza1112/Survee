const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    //console.log(req.body);
    //Now req.body contains the token pased from client
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "inr",
      description: "5Rs for 5 surveys",
      source: req.body.id
    });

    //console.log(charge);
    req.user.credits += 5;

    const user = await req.user.save();
    console.log(user);
    //from now on in the request use user to reference props of user model instead
    //of req.user as not all props are intrinsically updated
    res.send(user);
  });
};
