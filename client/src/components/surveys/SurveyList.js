import React from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import { Card } from "react-bootstrap";
class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div style={{ padding: "5px" }}>
          <Card>
            <div className="text-center">
              <Card.Header>{survey.title}</Card.Header>
              <Card.Body>
                <Card.Title>{survey.body}</Card.Title>
              </Card.Body>
            </div>
            <Card.Footer className="text-muted">
              <div style={{ float: "right" }}>
                Sent On: {new Date(survey.dateSent).toLocaleString()}
              </div>
              <div>
                <a href="/">Yes: {survey.yes}</a>,
                <a href="/">No: {survey.no}</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <br></br>
        {this.renderSurveys()}
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
