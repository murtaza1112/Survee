import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header";
import * as actions from "../actions";
import Landing from "./Landing";
const Surveys = () => <div>Surveys</div>;
class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          {/* the exact attribute if true only render content of the route
      if path is not contained in url */}
          <Route path="/" component={Header} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Surveys} />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
