import $ from "jquery";
import React, { createRef } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require("formBuilder/dist/form-render.min.js");

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.fb = createRef();
  }

  componentDidMount() {
    //console.log(this.props.surveyObj);
    const survey = this.props.surveyObj;
    console.log(survey);
    if (survey) {
      var formData = survey.draft.form;
      $(this.fb.current).formRender({ formData });
    } else {
      $(this.fb.current).empty();
      $(this.fb.current).append("<div>Sorry This form dosent exist .</div>");
    }
  }
  // componentDidUpdate() {
  //   //console.log(this.props.surveyObj);
  //   const survey = this.props.surveyObj;
  //   console.log(survey);
  //   if (survey) {
  //     var formData = survey.draft.form;
  //     $(this.fb.current).formRender({ formData });
  //   } else {
  //     $(this.fb.current).empty();
  //     $(this.fb.current).append("<div>Sorry This form dosent exist .</div>");
  //   }
  // }

  render() {
    return (
        <div className="display" ref={this.fb}>
          Loading Form...
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, surveys: state.surveys };
};
export default connect(mapStateToProps)(Form);
