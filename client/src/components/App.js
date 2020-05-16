import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "./Footer";
import Header from "./Header";
import * as actions from "../actions";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import surveyNew from "./surveys/SurveyNew";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import FormBuilder from "./formBuilder/FormBuilder";
import FormDisplay from "./formBuilder/FormDisplay";
import SingleFormDisplay from "./formBuilder/SingleFormDisplay";
import Feedback from "./surveys/Feedback";
import ThankYou from "./surveys/ThankYou";
import FormEdit from "./formBuilder/FormEdit";
import SurveyView from "./surveys/SurveyView";
import Loading from "./Loading";
import Login from "./Login";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    console.log(this.props.auth);
    if (this.props.auth === null)
      return (
        <div className="site-container">
          <Loading />
        </div>
      );

    if (this.props.auth === false)
      return (
        <div className="site-container">
          <BrowserRouter>
            <div className="site-header">
              <Route path="/" component={Header} />
            </div>
            <div className="site-content">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Container>
                  <Route exact path="/surveys/thankyou" component={ThankYou} />
                  <Route
                    exact
                    path="/surveys/feedback/:id"
                    component={Feedback}
                  />
                  <Route component={Login} />
                </Container>
              </Switch>
            </div>

            <div className="site-footer">
              <Footer />
            </div>
          </BrowserRouter>
        </div>
      );

    return (
      <div className="site-container">
        <BrowserRouter>
          <div className="site-header">
            <Route path="/" component={Header} />
          </div>
          <div className="site-content">
            <Route exact path="/" component={Landing} />
            <Container>
              <Route exact path="/surveys" component={Dashboard} />
              <Route exact path="/surveys/new" component={surveyNew} />
              <Route exact path="/surveys/view/:id" component={SurveyView} />
              <Route exact path="/surveys/thankyou" component={ThankYou} />
              <Route exact path="/surveys/feedback/:id" component={Feedback} />

              <Route exact path="/forms/create" component={FormBuilder} />
              <Route exact path="/forms" component={FormDisplay} />
              <Route exact path="/forms/edit" component={FormEdit} />
              <Route
                exact
                path="/forms/view/:id"
                component={SingleFormDisplay}
              />
            </Container>
          </div>

          <div className="site-footer">
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(App);
