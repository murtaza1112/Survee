import React from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";

//Use component level state to toggle between review page and edit page
//as using 1.router can allow unauthorized coder to ue page(have to add conditional logic)
//2.Use redux to get reducer and action creator to update state but agin lots of code
//3. Use conponent level state to manage application
class surveyNew extends React.Component {
  //normally to initialize state use construtor with this.state
  // but create-react-app allows state initialization outside of constructor
  // constructor(props)
  // {
  //   super(props);
  //   this.state {showFormReview:false};
  // }
  // both are equivalent
  state = { showFormReview: false };
  renderContent() {
    if (this.state.showFormReview)
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
      // pass calllback to function to render submit form on screen
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}
//IMPORTANT:WHY REDUX FORM USED HERE , EVEN THOUGH ALREADY USED IN CHILD WHERE REQUIRED?
// IF NO reduxform used here then the site works properly but when redirected to other routes in
// the site the value of form persists which is annoying cuz (unmountDestroy : true) in Child
// Now by adding reduxform here in parent if u toggle between formreview and form the value persists
// but if u leave the survey properly(to another route) the values go away cuz on the parent default value
// of unmount is applied which is false.so the moment the form unmounts it clears away the content.
export default reduxForm({
  form: "surveyForm",
})(surveyNew);
