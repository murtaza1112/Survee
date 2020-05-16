import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loading.scss";

function Loading(props) {
  return (
    <div class="holder">
      <div class="preloader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
export default Loading;
