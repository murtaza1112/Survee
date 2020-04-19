import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "./Footer";
import Header from "./Header";
import * as actions from "../actions";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import surveyNew from "./surveys/SurveyNew";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Iconbar from "./Iconbar";
import { Container } from "react-bootstrap";
import FormBuilder from "./formBuilder/FormBuilder";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="site-container">
        <Iconbar />
        <BrowserRouter>
          <div className="site-header">
            <Route path="/" component={Header} />
          </div>
          <div className="container site-content">
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={surveyNew} />
            <Route exact path="/forms/create" component={FormBuilder} />
          </div>

          <div className="site-footer">
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
