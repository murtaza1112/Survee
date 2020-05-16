import $ from "jquery";
import React, { createRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";
import * as EmailValidator from "email-validator";
import { withRouter } from "react-router-dom";
require("jquery-ui-sortable");
require("formBuilder");
require("formBuilder/dist/form-render.min.js");

class Feedback extends React.Component {
  //   state = { form: {} };
  constructor(props) {
    super(props);
    this.fb = createRef();
    this.errors = createRef();
  }

  async componentDidUpdate() {
    const id = this.props.location.pathname.slice(18);
    // console.log(id);
    const res = await axios.get(`/api/surveys/${id}`);
    // console.log(res.data);
    if (!this.props.auth) {
      return;
    }

    const draft = res.data.draft;
    if (draft) {
      var formData = draft.form;
      //   this.state.form = draft;
      console.log(formData);
      $(this.fb.current).formRender({ formData });
    } else {
      $(this.fb.current).append("<div>Sorry This form dosent exist .</div>");
    }
  }
  renderErrors(errors) {
    return errors.map((error) => {
      if (error && Array.isArray(error) && error.length != 0) {
        return `<li>${error}</li>`;
      }
    });
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  validate(userData) {
    const errors = userData.map(
      ({ type, required, userData, label, subtype }) => {
        console.log(type, required, userData, subtype);
        if (type !== "header" && type !== "paragraph") {
          const error = [];
          const val =
            Array.isArray(userData) &&
            userData.length === 1 &&
            userData[0] === "";
          console.log(val);
          if (required) {
            if (!userData || val)
              error.push(`'${label}' :This is a required field.`);
          }
          if (subtype === "email") {
            if (!this.validateEmail(userData))
              error.push(`'${label}' :Please enter a valid email address.`);
          }
          return error;
        }
      }
    );
    console.log(errors);
    return errors;
  }
  async handleSubmit() {
    const id = this.props.location.pathname.slice(18);
    var userData = $(this.fb.current).formRender("userData");
    // console.log(userData);
    const errors = this.validate(userData);
    const renderError = this.renderErrors(errors);
    // console.log(renderError);
    const exist = renderError.filter((element) => element);
    // console.log(exist);
    $(this.errors.current).empty();
    if (exist.length > 0) {
      //   console.log("Errors exist .");
      var finalRender = "";
      this.scrollToTop();
      renderError.forEach((val) => {
        if (val) finalRender += val;
      });
      //   console.log(finalRender);
      $(this.errors.current).append(
        `<div>
          <ul>${finalRender}</ul>
        </div>`
      );
    } else {
      await axios.post(`/api/surveys/${id}`, userData);

      window.location.href = "/surveys/thankyou";
    }
  }
  render() {
    return (
      <div>
        <Alert variant="danger">
          <h5 style={{ textAlign: "center" }}>
            <b>
              <i>
                <u>Error</u>
              </i>
            </b>
          </h5>
          <div ref={this.errors} />
        </Alert>
        <div className="display">
          <div ref={this.fb} />
          <Button block type="submit" onClick={() => this.handleSubmit()}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps, actions)(withRouter(Feedback));
