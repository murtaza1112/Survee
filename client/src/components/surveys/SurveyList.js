import React from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import { Card, Button, Row, Container, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./surveyList.css";

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    if (this.props.surveys.length === 0)
      return (
        <Alert variant="dark" style={{ textAlign: "center", width: "100%" }}>
          <Alert.Heading>
            <i>Surveys</i>
          </Alert.Heading>
          <p>You have not created a survey yet .</p>
        </Alert>
      );
    return this.props.surveys.reverse().map((survey) => {
      console.log(survey);
      let date = new Date(survey.dateSent).toLocaleString();
      let time = date.slice(date.length - 8);
      let dis = date.slice(0, date.length - 8);
      console.log(time);
      var dif = Math.abs(new Date() - new Date(survey.dateSent));
      let sec = dif / 1000;
      let min = sec / 60;
      let hours = min / 60;
      let days = hours / 24;
      let months = days / 30;
      let years = months / 365;
      let dates = { sec, min, hours, days, months, years };
      console.log(dates);
      let disp = "";
      if (years >= 1)
        disp =
          Math.floor(years).toString() +
          " year " +
          (Math.floor(years) !== 1 ? "s" : "");
      else if (months >= 1)
        disp =
          Math.floor(months).toString() +
          " month " +
          (Math.floor(months) !== 1 ? "s" : "");
      else if (days >= 1)
        disp =
          Math.floor(days).toString() +
          " day" +
          (Math.floor(days) !== 1 ? "s" : "");
      else if (hours >= 1)
        disp =
          Math.floor(days).toString() +
          " hour" +
          (Math.floor(days) !== 1 ? "s" : "");
      else if (min >= 1)
        disp =
          Math.floor(min).toString() +
          " minute" +
          (Math.floor(min) !== 1 ? "s" : "");
      else disp = "a few seconds";

      let displayDate = `Created ` + disp + " ago";
      console.log(displayDate);
      return (
        <div style={{ padding: "5px" }}>
          <Col xs={12} md={6} lg={6} xl={4}>
            <div className="card-style">
              <Card bg="dark" text="white">
                <div className="text-center">
                  <Card.Header>{survey.title}</Card.Header>
                  <Card.Body>
                    <Card.Title>{survey.body}</Card.Title>
                    <hr />
                    <Button
                      variant="outline-light"
                      className="button-style"
                      onClick={(e) =>
                        (window.location.pathname = `/surveys/view/${survey._id}`)
                      }
                    >
                      {/* <Link to={`/surveys/view/${survey._id}`} className="link"> */}
                      View Responses
                      {/* </Link> */}
                    </Button>
                  </Card.Body>
                </div>
                <Card.Footer className="text-muted">
                  <div className="text-center">
                    <p>{displayDate}</p>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </Col>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <Container>
          <Row>{this.renderSurveys()}</Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { surveys: state.surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);

// <div className="card darken-1" key={survey._id}>
// <div className="card-content">
//   <span className="card-title">{survey.title}</span>
//   <p>{survey.body}</p>
//   <p className="right">
//     Sent On: {new Date(survey.dateSent).toLocaleString()}
//   </p>
// </div>
// <div className="card-action">
//   <a>Yes: {survey.yes}</a>
//   <a>No: {survey.no}</a>
// </div>
// </div>
