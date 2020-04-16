import React from "react";
import { reduxForm, Field } from "redux-form";
import surveyField from "./SurveyField";
import _ from "lodash";
import validateEmails from "../../utils/validateEmail";
import formFields from "./formFields";
import { Form, Button } from "react-bootstrap";
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
      <Form
        onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}
        style={{ paddingTop: "20px" }}
      >
        {this.renderFields()}

        <Button variant="outline-danger" href="/surveys">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="outline-secondary"
          style={{ float: "right" }}
        >
          Next
        </Button>
      </Form>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || " ");
  console.log(errors);
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
