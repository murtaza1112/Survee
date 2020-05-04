import $ from "jquery";
import React, { Component, createRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require("formBuilder/dist/form-render.min.js");

function toggleEdit(editing) {
  document.body.classList.toggle("form-rendered", !editing);
}
class FormEdit extends Component {
  state = { show: false, form: [] };
  fb = createRef();
  errors = createRef();
  options = {
    formData: this.props.location.form,
    scrollToFieldOnAdd: true,
    disableFields: ["autocomplete", "file", "paragraph", "hidden"],
    onSave: (evt, formData) => {
      toggleEdit(false);
      this.setState({ form: formData });
      $(".render-wrap").formRender({ formData });
    },
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
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  validate(obj) {
    const form = JSON.parse(obj.form);
    var buttons = 0;
    var errors = [];
    form.forEach((element) => {
      if (element.type === "button") buttons++;
    });
    if (buttons != 1)
      errors.push("Form must contain only a single button.(For submission)");

    return errors;
  }
  handleSubmit(event) {
    event.preventDefault();
    const { form } = this.state;
    var obj = { form, id: this.props.location.id };
    console.log(obj.id);

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
      this.props.updateDraft(obj, this.props.history);
    }
  }
  render() {
    return (
      <div>
        <h1>Form Editor</h1>
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
            <p>Are you sure you want to submit the form ?</p>
            <Form.Text className="text-muted">
              <p style={{ color: "red" }} ref={this.errors}></p>
            </Form.Text>
            <Button onClick={(e) => this.handleSubmit(e)}>Submit</Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps, actions)(withRouter(FormEdit));
