import React from "react";
import { connect } from "react-redux";
import { Card, Button, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import Responses from "./Responses";
import Summary from "./Summary";
import Form from "./Form";
import axios from "axios";
import $ from "jquery";
import * as actions from "../../actions";
import "./SurveyView.css";
import Loading from "../Loading";

class SurveyView extends React.Component {
  state = { survey: {} };
  async componentDidMount() {
    const surveyId = this.props.location.pathname.slice(14);
    const res = await axios.get(`/api/surveys/${surveyId}`);
    console.log(res);
    this.setState({ survey: res.data });
  }

  render() {
    const { survey } = this.state;
    console.log(survey);
    const check = $.isEmptyObject(survey);
    if (check) return <Loading />;
    return (
      <div>
        <Tabs defaultActiveKey="summary" id="uncontrolled-tab-example">
          <Tab eventKey="summary" title="Summary">
            <Summary surveyObj={survey} />
          </Tab>
          <Tab eventKey="form" title="Form">
            <Form surveyObj={survey} />
          </Tab>
          <Tab eventKey="profile" title="Responses">
            <Responses surveyObj={survey} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { surveys: state.surveys };
}

export default SurveyView;
