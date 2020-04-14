import React from "react";

class SurveyField extends React.Component {
  render() {
    const input = this.props.input;
    const meta = this.props.meta;
    const { error, touched } = meta;

    return (
      <div>
        <label>{this.props.label}</label>
        <input {...input} style={{ marginBottom: "5px" }} />
        <div className="red-text" style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    );
  }
}

export default SurveyField;
