import $ from "jquery";
import React, { Component, createRef } from "react";
import { Button, Modal, Form, ThemeProvider } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./FormBuilder.css";
import { withRouter } from "react-router-dom";
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require("formBuilder/dist/form-render.min.js");
const formData = [
  {
    type: "header",
    subtype: "h1",
    label: "Create Your Form",
  },
  {
    type: "paragraph",
    label: "Kindly add your contents here.",
  },
];

function toggleEdit(editing) {
  document.body.classList.toggle("form-rendered", !editing);
}
class FormBuilder extends Component {
  fb = createRef();
  errors = createRef();
  state = { show: false, value: "", form: [] };
  options = {
    formData,
    scrollToFieldOnAdd: true,
    disableFields: ["autocomplete", "file", "paragraph", "hidden"],
    onSave: (evt, formData) => {
      toggleEdit(false);
      this.setState({ form: formData });
      $(".render-wrap").formRender({ formData });
    },
    disabledAttrs: ["name", "access", "className"],
  };
  componentDidMount() {
    $(this.fb.current).formBuilder(this.options);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  validate(obj) {
    const form = JSON.parse(obj.form);
    var buttons = 0;
    var errors = [];
    form.forEach((element) => {
      if (element.type === "button") buttons++;
    });
    if (buttons != 1)
      errors.push("Form must contain only a single button.(For submission)");

    if (obj.name) {
      const result = this.props.auth.formDrafts.filter(
        (element) => element.name === obj.name
      );
      console.log(result);
      if (result.length) {
        errors.push("Form name must be unique.");
      }
    } else errors.push("Please specify form name.");
    return errors;
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { form, value } = this.state;
    var obj = { form, name: value };
    console.log(obj);
    const errors = this.validate(obj);
    $(this.errors.current).empty();
    if (errors.length) {
      const renderErrors = errors.map((element) => `<li>${element}</li>`);
      console.log(renderErrors);
      $(this.errors.current).append(
        `<div>
          <ul>${renderErrors}</ul>
        </div>`
      );
      console.log("Errors exist:", errors);
    } else {
      console.log("No errors");
      this.props.submitDraft(obj, this.props.history);
    }
  }

  render() {
    return (
      <div>
        <h1>Form Creator</h1>
        <div id="build-wrap" ref={this.fb}></div>
        <div className="render-wrap"></div>
        <Button id="edit-form" onClick={() => toggleEdit(true)}>
          Edit Form
        </Button>
        <Button id="save-form" variant="success" onClick={this.showModal}>
          Save Draft
        </Button>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please specify a name for the form
            <br></br>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Draft Name"
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                />
                <Form.Text className="text-muted">
                  <p style={{ color: "red" }} ref={this.errors}></p>
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps, actions)(withRouter(FormBuilder));
