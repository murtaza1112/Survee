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

  componentDidUpdate() {
    const id = this.props.location.pathname.slice(12);
    if (!this.props.auth) {
      return <div>Loading..</div>;
    }
    const draft = this.props.auth.formDrafts.find((form) => form._id === id);
    if (draft) {
      var formData = draft.form;
      this.state.form = draft;
      $(this.fb.current).formRender({ formData });
    } else {
      $(this.fb.current).append("<div>Sorry This form dosent exist .</div>");
    }
  }

  render() {
    return <div className="display" ref={this.fb} />;
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(SingleFormDisplay);
