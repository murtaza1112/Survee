import React, { createRef } from "react";
import $ from "jquery";
import { Container, Button, Form, Row } from "react-bootstrap";
import "./Responses.css";
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require("formBuilder/dist/form-render.min.js");

class Responses extends React.Component {
  state = { survey: {}, current: 1 };
  formDisplay = createRef();
  componentDidMount() {
    this.setState({ survey: this.props.surveyObj });
  }
  onChangeHandler(event) {
    console.log(event.target.value);

    if (
      event.target.value !== "" &&
      event.target.value <= this.state.survey.recipients.length
    )
      this.setState({ current: event.target.value });
  }
  renderResponses(survey) {
    const length = survey.recipients.length;
    if (length === 0) return <div>Sorry No responses submitted yet.</div>;
    if (!survey.recipients) return;

    const form = JSON.parse(survey.draft.form);

    console.log(this.state.current);
    console.log(survey.recipients[this.state.current - 1]);

    if (!this.state.current)
      var recipients = JSON.parse(survey.recipients[0].responded);
    else
      var recipients = JSON.parse(
        survey.recipients[this.state.current - 1].responded
      );

    const formData = form.map((element, index) => {
      return { ...element, userData: recipients[index].userData };
    });

    // console.log(formData);
    // console.log(form);
    // console.log(recipients);
    $(this.formDisplay.current).formRender({
      formData,
    });
    // console.log(survey.recipients[this.state.current - 1].dateSubmitted);

    return (
      <Container>
        <div>
          <div className="upper">
            <div style={{ alignItems: "left" }}>
              <Form inline>
                <Form.Row style={{ alignItems: "center" }}>
                  <Button
                    style={{ marginRight: "5px", borderRadius: "50%" }}
                    onClick={() =>
                      this.setState({ current: this.state.current - 1 })
                    }
                    disabled={this.state.current === 1}
                  >
                    <i class="fa fa-arrow-left"></i>
                  </Button>
                  <Form.Group style={{ marginBottom: "0px" }}>
                    <Form.Control
                      type="number"
                      value={this.state.current}
                      style={{ width: "50px" }}
                      onChange={(e) => this.onChangeHandler(e)}
                    />
                  </Form.Group>
                  <p
                    style={{
                      marginBottom: "0px",
                      marginLeft: "5px",
                    }}
                  >
                    of {length}
                  </p>
                  <Button
                    style={{ marginLeft: "5px", borderRadius: "50%" }}
                    disabled={this.state.current === length}
                    onClick={() =>
                      this.setState({ current: this.state.current + 1 })
                    }
                  >
                    {" "}
                    <i className="fa fa-arrow-right"></i>
                  </Button>
                </Form.Row>
              </Form>
            </div>
            <div>
              <p style={{ textAlign: "right", paddingTop: "12px" }}>
                Submission Time:
                {new Date(
                  survey.recipients[this.state.current - 1].dateSubmitted
                ).toLocaleString()}
              </p>
            </div>
          </div>
          <div
            className="formDisplay"
            className="display"
            ref={this.formDisplay}
          />
        </div>
      </Container>
    );
  }

  render() {
    const survey = this.props.surveyObj;
    return (
      <div>
        <br />
        {this.renderResponses(survey)}
      </div>
    );
  }
}

export default Responses;
