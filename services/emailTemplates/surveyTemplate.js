const keys = require("../../config/keys");

module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Feedback Form</h3>
          <p>${survey.body}</p>
          <div>
          <p>Please click here to submit Feedback:
            <a href="${keys.redirectDomain}surveys/feedback/${survey.id}">Submit Feedback</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};
