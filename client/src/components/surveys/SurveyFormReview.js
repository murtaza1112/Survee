import _ from "lodash";
import React, { useRef, useEffect } from "react";
import $ from "jquery";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";
import "./SurveyFormReview.css";
import * as actions from "../../actions";
import { Button, Spinner, Modal } from "react-bootstrap";
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require("formBuilder/dist/form-render.min.js");

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ textAlign: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          Request Processing
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Please do not refresh the page.</h4>
        <Button variant="light" disabled>
          <Spinner
            as="span"
            animation="border"
            size="md"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </Button>
      </Modal.Body>
    </Modal>
  );
}

const SurveyFormReview = ({
  onCancel,
  formValues,
  submitSurvey,
  history,
  auth,
}) => {
  const refInput = useRef();
  const [modalShow, setModalShow] = React.useState(false);
  console.log(formValues);

  useEffect(() => {
    const { current } = refInput;
    if (!auth) {
      $(current).append("<div>Loading...</div>");
    } else {
      console.log(auth.formDrafts);
      const match = auth.formDrafts.find((elem) => {
        console.log(elem.name);
        return elem.name === formValues.form;
      });
      console.log(match);
      if (match) $(current).formRender({ formData: match.form });
    }
  });
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>
          <b>
            <i>{label}</i>
          </b>
        </label>
        <div>{formValues[name]}</div>
        <hr />
      </div>
    );
  });

  return (
    <div>
      <h1>Confirm Entries</h1>
      {reviewFields}

      <div>
        <label>
          <b>
            <i>Form</i>
          </b>
        </label>
        <div className="form" ref={refInput}></div>
      </div>
      <Button variant="warning" onClick={onCancel}>
        Back
      </Button>
      <Button
        onClick={() => {
          setModalShow(true);
          return submitSurvey(formValues, history);
        }}
        variant="success"
        style={{ float: "right" }}
      >
        Send Survey
        <i className="material-icons" style={{ float: "right" }}>
          email
        </i>
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return { formValues: state.form.surveyForm.values, auth: state.auth };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
