import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header";
import * as actions from "../actions";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import surveyNew from "./surveys/SurveyNew";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          {/* the exact attribute if true only rende r content of the route
      if path is not contained in url */}
          <Route path="/" component={Header} />
          <div className="container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={surveyNew} />
          </div> 
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
