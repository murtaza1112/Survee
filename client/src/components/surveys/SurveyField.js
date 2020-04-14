import React from "react";

class SurveyField extends React.Component {
  render() {
    //reducfrom provides this value
    const input = this.props.input;
    const meta = this.props.meta;
    const { error, touched } = meta;
    // console.log(meta);
    // get touched value as the form render in the beginnign as well so renders an error Before
    // user even interacts with the form
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
