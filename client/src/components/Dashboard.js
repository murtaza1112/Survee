import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";
import "./Dashboard.css";
class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <SurveyList />
        <Link to="/surveys/new" className="float">
          <i className="material-icons my-float">add</i>
        </Link>
      </div>
    );
  }
}

export default Dashboard;
