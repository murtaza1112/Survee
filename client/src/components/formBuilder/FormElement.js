import React, { useState } from "react";
import { Card, Button, Modal, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
function FormElement(props) {
  const element = props.element;
  const [show, setShow] = useState(false);
  console.log(element);
  return (
    <div>
      <br />
      <Card bg="dark" border="light" text="light">
        <Card.Header className="center">{element.name}</Card.Header>
        <Card.Body>
          <Button
            variant="outline-success"
            block
            href={`/forms/view/${element._id}`}
          >
            View Form
          </Button>
          <Button variant="outline-warning" block>
            <Link
              to={{
                pathname: "/forms/edit",
                form: element.form,
                id: element._id,
              }}
            >
              Edit
            </Link>
          </Button>
          <Alert show={show} variant="danger" style={{ paddingTop: "12px" }}>
            <Alert.Heading>
              Are you sure you want to delete the form ?
            </Alert.Heading>
            <p>Warning : Once deleted the form cannot be restored .</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="outline-primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log(element);
                  props.draftSend(element);
                  return setShow(false);
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            </div>
          </Alert>
          {!show && (
            <Button
              variant="outline-danger"
              block
              onClick={() => setShow(true)}
              block
            >
              Delete
            </Button>
          )}
          <hr />
          Created At : {new Date(element.dateCreated).toLocaleString()}
          <p>Last Edited : {new Date(element.lastEdited).toLocaleString()}</p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FormElement;
