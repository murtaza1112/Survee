import React from "react";
import { Alert } from "react-bootstrap";

function ThankYou(props) {
  return (
    <div>
      <Alert variant="success" style={{ textAlign: "center" }}>
        <Alert.Heading>Your response has been recorded.</Alert.Heading>
        <hr />
        <p>Thank you for submitting your response!!</p>
      </Alert>
    </div>
  );
}
export default ThankYou;
