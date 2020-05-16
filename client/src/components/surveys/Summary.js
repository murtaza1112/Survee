import React, { createRef } from "react";
import $ from "jquery";
import { Container, Button, Form, Row, Tab, Tabs } from "react-bootstrap";
import "./Summary.css";
import { Pie, Doughnut, Polar } from "react-chartjs-2";

class Summary extends React.Component {
  state = { survey: {} };
  formDisplay = createRef();
  componentDidMount() {
    this.setState({ survey: this.props.surveyObj });
    console.log(this.props.surveyObj);
  }
  renderSummary() {
    if (!this.state.survey.draft) return <div>Loading..</div>;
    const draft = JSON.parse(this.state.survey.draft.form);
    const users = this.state.survey.recipients;
    // console.log(users);
    if (users.recipients)
      return <div>Sorry , No recipients have applied yet.</div>;

    const userJson = users.map((element) => JSON.parse(element.responded));
    // console.log(draft);
    // console.log(userJson);
    return draft.map((element, index) => {
      if (element.type === "header")
        return (
          <div className="formDisplay cen">
            <h2>
              <b>
                <i>
                  <u>{element.label}</u>
                </i>
              </b>
            </h2>
          </div>
        );

      if (element.type === "paragraph")
        return (
          <div className="formDisplay cen">
            <h5>
              <b>
                <i>
                  <u>{element.label}</u>
                </i>
              </b>
            </h5>
          </div>
        );

      if (element.type === "date") {
        return (
          <div className="formDisplay">
            <div className="cen">
              <h5>
                <b>
                  <i>
                    <u>{element.label}</u>
                  </i>
                </b>
              </h5>
            </div>
            <div>
              <Row>
                {userJson.map((elem, ind) => {
                  const userData = elem[index].userData;
                  if (Array.isArray(userData) && userData.length > 0) {
                    // console.log(elem, userData);
                    const date = userData[0];
                    const dateArray = date.split("-").reverse();
                    return (
                      <div
                        className="date-display"
                        style={{ padding: "10px" }}
                      >{`${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`}</div>
                    );
                  }
                })}
              </Row>
            </div>
          </div>
        );
      }

      if (
        element.type === "text" ||
        element.type === "textarea" ||
        element.type === "number"
      ) {
        return (
          <div className="formDisplay">
            <div className="cen">
              <h5>
                <b>
                  <i>
                    <u>{element.label}</u>
                  </i>
                </b>
              </h5>
            </div>
            <div>
              <Row>
                {userJson.map((elem, ind) => {
                  const userData = elem[index].userData;
                  if (Array.isArray(userData) && userData.length > 0) {
                    // console.log(elem, userData);
                    return (
                      <div className="date-display" style={{ padding: "10px" }}>
                        {userData}
                      </div>
                    );
                  }
                })}
              </Row>
            </div>
          </div>
        );
      }
      // console.log(element.values);
      let map = {};
      userJson.forEach((response) => {
        const res = response[index];
        if (res.userData) {
          const { userData } = res;
          userData.forEach((user) => {
            if (!map[user]) map[user] = 0;
            map[user]++;
          });
        }
      });
      // console.log(map);
      const labels = [];
      const vals = [];
      const backgroundColor = [];
      let maps = {};
      Object.keys(map).forEach((e) => {
        const found = element.values.find((elem) => elem.value === e);
        // console.log(found);
        if (found) labels.push(found.label);
        else labels.push(e);
        vals.push(map[e]);

        const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        while (maps[color]) {
          color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        }
        maps[color] = true;
        backgroundColor.push(color);
      });
      // console.log(labels);
      // console.log(vals);
      // console.log(backgroundColor);
      return (
        <div className="formDisplay">
          <div className="cen">
            <h5>
              <b>
                <i>
                  <u>{element.label}</u>
                </i>
              </b>
            </h5>
          </div>
          <div>
            <div>
              <Tabs defaultActiveKey="pie" id="uncontrolled-tab-example">
                <Tab eventKey="pie" title="Pie">
                  <Pie
                    data={{
                      labels,
                      datasets: [{ data: vals, backgroundColor }],
                    }}
                    height={150}
                  />
                </Tab>
                <Tab eventKey="doughnut" title="Doughnut">
                  <Doughnut
                    data={{
                      labels,
                      datasets: [{ data: vals, backgroundColor }],
                    }}
                    height={150}
                  />
                </Tab>
                <Tab eventKey="polar" title="Polar">
                  <Polar
                    data={{
                      labels,
                      datasets: [{ data: vals, backgroundColor }],
                    }}
                    height={150}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    // console.log(this.state.survey);
    return <div>{this.renderSummary()}</div>;
  }
}

export default Summary;
