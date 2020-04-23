import React, { Component } from "react";
import { connect } from "react-redux";

function FormDisplay(props) {
  const user = props.auth;
  console.log(user);

  return <div>All the form drafts .</div>;
}
const mapStateToProps = (state) => {
  console.log(state);
  return { auth: state.auth };
};
export default connect(mapStateToProps)(FormDisplay);
