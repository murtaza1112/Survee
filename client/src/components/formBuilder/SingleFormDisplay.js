import $ from "jquery";
import React, { createRef } from "react";
import { connect } from "react-redux";
import "./SingleFormDisplay.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require("formBuilder/dist/form-render.min.js");

class SingleFormDisplay extends React.Component {
  state = { form: {} };
  constructor(props) {
    super(props);
    this.fb = createRef();
  }
  componentDidMount() {
    const id = this.props.location.pathname.slice(12);
    const draft = this.props.auth.formDrafts.find((form) => form._id === id);
    console.log(draft);
    if (draft) {
      $(this.fb.current).formRender({ formData: draft.form });
    } else {
      $(this.fb.current).append("<div>Sorry This form dosent exist .</div>");
    }
  }
  render() {
    console.log("Form");
    if (!this.props.auth) {
      return <div>Loading..</div>;
    }
    return <div className="display" ref={this.fb} />;
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(SingleFormDisplay);
