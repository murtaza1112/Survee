import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";
import "./SurveyFormReview.css";
import * as actions from "../../actions";
import { Button, Spinner, Modal } from "react-bootstrap";

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

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
        <hr />
      </div>
    );
  });

  return (
    <div>
      <h1>Confirm Entries</h1>
      {reviewFields}
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
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
