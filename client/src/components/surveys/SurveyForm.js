import React from "react";
import { reduxForm, Field } from "redux-form";
import surveyField from "./SurveyField";
import _ from "lodash";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmail";
import formFields from "./formFields";

class surveyForm extends React.Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          component={surveyField}
          type="text"
          label={label}
          name={name}
          key={name}
        />
      );
    });
  }
  render() {
    return (
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

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || " ");

  _.each(formFields, ({ name }) => {
    if (!values[name]) errors[name] = "Please provide a value";
  });

  return errors;
}

export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(surveyForm);
