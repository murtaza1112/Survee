import React from "react";
import { Form } from "react-bootstrap";
class SurveyField extends React.Component {
  render() {
    const input = this.props.input;
    const meta = this.props.meta;
    const { error, touched } = meta;
    const placeholder =
      input.name.charAt(0).toUpperCase() + input.name.slice(1);

    return (
      <Form.Group>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control {...input} placeholder={placeholder} />
        <Form.Text className="text-muted">
          <p style={{ color: "red" }}>{touched && error}</p>
        </Form.Text>
      </Form.Group>
    );
  }
}

export default SurveyField;
