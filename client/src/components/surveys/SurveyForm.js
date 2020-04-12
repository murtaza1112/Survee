import React from "react";
import { reduxForm, Field } from "redux-form";
import surveyField from "./SurveyField";
import _ from "lodash";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmail";
import formFields from "./formFields";

class surveyForm extends React.Component {
  renderFields() {
    return (
      // lots of code with duplicate content
      // <div>
      //   <Field name="title" component={surveyField} type="text" label="SurveyTitle"/>
      //   <Field name="Subject" component={surveyField} type="text" label="subjectLine"/>
      //   <Field name="body" component={surveyField} type="text" label="Email Body"/>
      //   <Field name="emails" component={surveyField} type="text" label="RecipientList"/>
      // </div>
      _.map(formFields, ({ label, name }) => {
        return (
          <Field
            component={surveyField}
            type="text"
            label={label}
            name={name}
            key={name}
          />
        );
      })
    );
  }
  render() {
    //reducfrom provides this value
    return (
      //dont put paranthesis on handlesubmit as dont want to call it when submitted
      <form
        onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}
      >
        {this.renderFields()}
        <Link to="/surveys" className="red btn-flat wite-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right wite-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    );
  }
}
// How to render error?
// if redux forms detects an value on the props of values with the same name async
// a form EventTarget(ex-title),it will add a prop to that tag , in meta prop
function validate(values) {
  const errors = {};
  // if (!values.title) {
  //   errors.title = "You must provide a title.";
  // }
  // if (!values.subject) {
  //   errors.subject= "You must provide a title.";
  // }
  // if (!values.body) {
  //   errors.body = "You must provide a title.";
  // }repitive logic
  errors.recipients = validateEmails(values.recipients || " ");
  //to avoid cases when undefined passed to emails (no value)
  _.each(formFields, ({ name }) => {
    if (!values[name]) errors[name] = "Please provide a value";
  });

  return errors;
}
// pass a validate form to check if input is proper or not pass a userdefined function
//redux form automatically unmounts when reloaded but use destroy on unmount to persist
export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(surveyForm);
