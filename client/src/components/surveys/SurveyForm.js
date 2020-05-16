import React from "react";
import { reduxForm, Field } from "redux-form";
import surveyField from "./SurveyField";
import _ from "lodash";
import validateEmails from "../../utils/validateEmail";
import formFields from "./formFields";
import { Form, Button } from "react-bootstrap";
import formSelect from "./formSelect";

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
  renderOptions() {
    if (!this.props.auth) return <div>Loading..</div>;
    return this.props.auth.formDrafts.map((element) => {
      return <option value={element.name}>{element.name}</option>;
    });
  }
  render() {
    return (
      <Form
        onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}
        style={{ paddingTop: "20px" }}
      >
        {this.renderFields()}

        <Field name="form" component={formSelect} key="form"></Field>

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
  // console.log(errors);
  _.each(formFields, ({ name }) => {
    console.log(name);
    if (!values[name]) errors[name] = "Please provide a value";
  });
  if (!values.form) errors.form = "Please provide a valid form.";
  return errors;
}

export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(surveyForm);
