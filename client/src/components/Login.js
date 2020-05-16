import React from "react";
import "./Login.css";
import { Button, Alert } from "react-bootstrap";

class Login extends React.Component {
  render() {
    return (
      <Alert variant="dark" className="center">
        <Alert.Heading>Error</Alert.Heading>
        <p>
          Sorry , You are not authorised to view this page .Please login to the
          website.
        </p>
        <Button variant="outline-dark" href="/auth/google">
          Google Login
        </Button>
      </Alert>
    );
  }
}

export default Login;
