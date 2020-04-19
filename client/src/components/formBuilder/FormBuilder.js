import $ from "jquery";
import React, { Component, createRef } from "react";
import { Button, Alert } from "react-bootstrap";
import "./FormBuilder.css";
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

var options = {
  formData,
  scrollToFieldOnAdd: true,
  disableFields: ["autocomplete", "file", "paragraph", "hidden"],
  onSave: function (evt, formData) {
    console.log("formbuilder saved");
    toggleEdit(false);
    $(".render-wrap").formRender({ formData });
  },
};

function toggleEdit(editing) {
  document.body.classList.toggle("form-rendered", !editing);
}
class FormBuilder extends Component {
  fb = createRef();
  componentDidMount() {
    $(this.fb.current).formBuilder(options);
  }

  render() {
    return (
      <div>
        <h1>Form Creator</h1>
        <div id="build-wrap" ref={this.fb}></div>
        <div class="render-wrap"></div>
        <Button id="edit-form" onClick={() => toggleEdit(true)}>
          Edit Form
        </Button>
        <Button
          id="save-form"
          variant="success"
          onClick={() => toggleEdit(true)}
        >
          Save Draft
        </Button>
      </div>
    );
  }
}
export default FormBuilder;
