import React, { useState } from "react";
import { Card, Button, Alert, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Display(date, prepend) {
  var dif = Math.abs(new Date() - date);
  let sec = dif / 1000;
  let min = sec / 60;
  let hours = min / 60;
  let days = hours / 24;
  let months = days / 30;
  let years = months / 365;
  let dates = { sec, min, hours, days, months, years };
  console.log(dates);
  let disp = "";
  if (years >= 1)
    disp =
      Math.floor(years).toString() +
      " year " +
      (Math.floor(years) !== 1 ? "s" : "");
  else if (months >= 1)
    disp =
      Math.floor(months).toString() +
      " month " +
      (Math.floor(months) !== 1 ? "s" : "");
  else if (days >= 1)
    disp =
      Math.floor(days).toString() +
      " day" +
      (Math.floor(days) !== 1 ? "s" : "");
  else if (hours >= 1)
    disp =
      Math.floor(days).toString() +
      " hour" +
      (Math.floor(days) !== 1 ? "s" : "");
  else if (min >= 1)
    disp =
      Math.floor(min).toString() +
      " minute" +
      (Math.floor(min) !== 1 ? "s" : "");
  else disp = "a few seconds";
  console.log();
  let displayDate = prepend + ` ` + disp + " ago";

  return displayDate;
}
function FormElement(props) {
  const element = props.element;
  const [show, setShow] = useState(false);
  console.log(element);
  return (
    <div>
      <br />
      <Col xs={12} md={6} lg={6} xl={4}>
        <div className="card-style">
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
                  className="link"
                >
                  Edit
                </Link>
              </Button>
              <Alert
                show={show}
                variant="light"
                text="white"
                style={{ marginTop: "12px" }}
              >
                <Alert.Heading>Delete Request Confirmation</Alert.Heading>
                <hr />
                <p>Warning : Once deleted the form cannot be restored .</p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={() => setShow(false)}
                    variant="dark"
                    style={{ float: "left" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      console.log(element);
                      props.draftSend(element);
                      return setShow(false);
                    }}
                    variant="danger"
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
                >
                  Delete
                </Button>
              )}
            </Card.Body>
            <Card.Footer className="text-center text-muted">
              <p> {Display(new Date(element.dateCreated), "Created")}</p>
              {/* Created At : {new Date(element.dateCreated).toLocaleString()} */}
              <p>{Display(new Date(element.lastEdited), "Edited")}</p>
            </Card.Footer>
          </Card>
        </div>
      </Col>
    </div>
  );
}

export default FormElement;
