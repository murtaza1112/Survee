const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const mongoose = require("mongoose");
const Survey = require("../models/Survey");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Mailer = require("../services/Mailer");
const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");
const apiKey = keys.sendGridKey;

module.exports = (app) => {
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });
};
