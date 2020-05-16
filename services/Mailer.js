// const sendgrid = require("sendgrid");
// const helper = sendgrid.mail;

const keys = require("../config/keys");

const sgMail = require("@sendgrid/mail");

class Mailer {
  constructor(props, recipients, content) {
    sgMail.setApiKey(keys.sendGridKey);
    console.log("Props", props);
    console.log("Recipients:", recipients);
    console.log("content", content);
    const msg = {
      to: recipients,
      from: "noreply@survee.com",
      subject: props.subject,
      text: props.body,
      html: content,
    };

    sgMail
      .sendMultiple(msg)
      .then(() => {
        console.log("emails sent successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
// class Mailer extends helper.Mail {
//   constructor({ subject, recipients }, content) {
//     super();

//     this.sgApi = sendgrid(keys.sendGridKey);
//     this.from_email = new helper.Email("no-reply@survee.com");
//     this.subject = subject;
//     this.body = new helper.Content("text/html", content);
//     this.recipients = this.formatAddresses(recipients);

//     this.addContent(this.body);
//     this.addClickTracking();
//     this.addRecipients();
//   }

//   formatAddresses(recipients) {
//     return recipients.map(({ email }) => {
//       return new helper.Email(email);
//     });
//   }

//   addClickTracking() {
//     const trackingSettings = new helper.TrackingSettings();
//     const clickTracking = new helper.ClickTracking(true, true);

//     trackingSettings.setClickTracking(clickTracking);
//     this.addTrackingSettings(trackingSettings);
//   }

//   addRecipients() {
//     const personalize = new helper.Personalization();

//     this.recipients.forEach((recipient) => {
//       personalize.addTo(recipient);
//     });
//     this.addPersonalization(personalize);
//   }

//   async send() {
//     const request = this.sgApi.emptyRequest({
//       method: "POST",
//       path: "/v3/mail/send",
//       body: this.toJSON(),
//     });

//     const response = await this.sgApi.API(request);
//     return response;
//   }
// }

module.exports = Mailer;
