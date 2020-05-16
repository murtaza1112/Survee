const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const mongoose = require("mongoose");
const Survey = require("../models/Survey");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Mailer = require("../services/Mailer");
const keys = require("../config/keys");
const Recipient = require("../models/Recipient");
module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id });
    //no need to get recipients therefore select addded to not get recipients
    console.log(surveys);
    res.send(surveys);
  });

  app.get("/api/surveys/:id", requireLogin, async (req, res) => {
    console.log(req.params.id);
    const survey = await Survey.findById(req.params.id);
    console.log(survey);
    res.send(survey);
  });

  app.post("/api/surveys/:id", requireLogin, async (req, res) => {
    // console.log(req.params.id);
    const survey = await Survey.findById(req.params.id);
    // const form = JSON.parse(req.body.userData);
    const userData = req.body;
    // console.log(req.body);
    const values = userData.map(({ userData, type, name }) => {
      var obj = { type };
      if (userData) obj.userData = userData;
      if (name) obj.name = name;
      return obj;
    });
    const jsonValues = JSON.stringify(values);
    //console.log(survey);
    survey.recipients.push({
      responded: jsonValues,
      dateSubmitted: Date.now(),
    });
    const newSurvey = await survey.save();
    console.log(newSurvey);
    res.send(newSurvey);
  });
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for the vote.");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();
    console.log("Called");
    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients, form } = req.body;

    const inputForm = req.user.formDrafts.find((elem) => elem.name === form);
    const recipientsArray = recipients
      .split(",")
      .map((email) => ({ email: email.trim() }));
    // console.log(inputForm);
    const survey = new Survey({
      title,
      subject,
      body,
      draft: {
        form: inputForm.form,
        name: inputForm.name,
      },
      _user: req.user.id,
      dateSent: Date.now(),
    });
    // console.log(survey);
    // Great place to send an email!
    const mailer = new Mailer(survey, recipientsArray, surveyTemplate(survey));

    try {
      // await mailer.send();
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
