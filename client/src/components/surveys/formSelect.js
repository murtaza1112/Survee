import React from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";

class formSelect extends React.Component {
  renderOptions() {
    return this.props.auth.formDrafts.map((element) => {
      return <option>{element.name}</option>;
    });
  }
  render() {
    const input = this.props.input;
    const meta = this.props.meta;
    const { error, touched } = meta;
    if (!this.props.auth) return <div>Loading..</div>;

    return (
      <Form.Group controlId="formGridState">
        <Form.Label>Select Form</Form.Label>
        <Form.Control {...this.props.input} as="select">
          <option />
          {this.renderOptions()}
        </Form.Control>
        <Form.Text className="text-muted">
          <p style={{ color: "red" }}>{touched && error}</p>
        </Form.Text>
      </Form.Group>
    );
  }
}
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(formSelect);
