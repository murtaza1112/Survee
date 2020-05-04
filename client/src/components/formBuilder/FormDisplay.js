import $ from "jquery";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Button, Modal, Container, Alert } from "react-bootstrap";
import "./FormDisplay.css";
import * as actions from "../../actions";
import FormElement from "./FormElement";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require("formBuilder/dist/form-render.min.js");

function renderList(list, draftSend) {
  return list.map((element) => {
    return <FormElement element={element} draftSend={draftSend} />;
  });
}
function FormDisplay(props) {
  const user = props.auth;
  console.log(user);
  if (!props.auth) return <div>Loading..</div>;
  const draftSend = (draft) => props.deleteDraft(draft);

  return <div>{renderList(props.auth.formDrafts, draftSend)}</div>;
}
const mapStateToProps = (state) => {
  console.log(state);
  return { auth: state.auth };
};
export default connect(mapStateToProps, actions)(FormDisplay);

// const drafts = [
//   {
//     form:
//       '[{"type":"header","subtype":"h1","label":"Create Your Form","access":false},{"type":"paragraph","subtype":"p","label":"Kindly add your contents here.","access":false},{"type":"checkbox-group","required":false,"label":"Checkbox Group","toggle":false,"inline":false,"name":"checkbox-group-1587494610695","access":false,"other":false,"values":[{"label":"Option 1","value":"option-1","selected":true}]},{"type":"radio-group","required":false,"label":"Radio Group","inline":false,"name":"radio-group-1587494610890","access":false,"other":false,"values":[{"label":"Option 1","value":"option-1"},{"label":"Option 2","value":"option-2"},{"label":"Option 3","value":"option-3"}]},{"type":"text","required":false,"label":"Text Field","className":"form-control","name":"text-1587494611292","access":false,"subtype":"text"},{"type":"text","required":false,"label":"Text Field","className":"form-control","name":"text-1587494611507","access":false,"subtype":"text"}]',
//     name: "fads",
//     dateCreated: "2020-04-26T13:10:02.194Z",
//     lastEdited: "2020-04-26T13:10:02.194Z",
//   },
//   {
//     form:
//       '[{"type":"header","subtype":"h1","label":"Create Your Form","access":false},{"type":"paragraph","subtype":"p","label":"Kindly add your contents here.","access":false},{"type":"checkbox-group","required":false,"label":"Checkbox Group","toggle":false,"inline":false,"name":"checkbox-group-1587905930811","access":false,"other":false,"values":[{"label":"Option 1","value":"option-1","selected":true}]},{"type":"number","required":false,"label":"Number","className":"form-control","name":"number-1587905931551","access":false}]',
//     name: "dfas",
//     dateCreated: "2020-04-26T13:10:02.194Z",
//     lastEdited: "2020-04-26T13:10:02.194Z",
//   },
//   {
//     form:
//       '[{"type":"header","subtype":"h1","label":"Create Your Form","access":false},{"type":"paragraph","subtype":"p","label":"Kindly add your contents here.","access":false},{"type":"date","required":false,"label":"Date Field","className":"form-control","name":"date-1587906467890","access":false},{"type":"textarea","required":false,"label":"Text Area","className":"form-control","name":"textarea-1587906468366","access":false,"subtype":"textarea"}]',
//     name: "fasd",
//     dateCreated: "2020-04-26T13:10:02.194Z",
//     lastEdited: "2020-04-26T13:10:02.194Z",
//   },
//   {
//     form:
//       '[{"type":"header","subtype":"h1","label":"Create Your Form","access":false},{"type":"paragraph","subtype":"p","label":"Kindly add your contents here.","access":false},{"type":"checkbox-group","required":false,"label":"Checkbox Group","toggle":false,"inline":false,"name":"checkbox-group-1587906593349","access":false,"other":false,"values":[{"label":"Option 1","value":"option-1","selected":true}]},{"type":"date","required":false,"label":"Date Field","className":"form-control","name":"date-1587906593483","access":false},{"type":"select","required":false,"label":"Select","className":"form-control","name":"select-1587906593670","access":false,"multiple":false,"values":[{"label":"Option 1","value":"option-1","selected":true},{"label":"Option 2","value":"option-2"},{"label":"Option 3","value":"option-3"}]}]',
//     name: "fdsa",
//     dateCreated: "2020-04-26T13:10:02.194Z",
//     lastEdited: "2020-04-26T13:10:02.194Z",
//   },
//   {
//     form:
//       '[{"type":"header","subtype":"h1","label":"Create Your Form","access":false},{"type":"paragraph","subtype":"p","label":"Kindly add your contents here.","access":false},{"type":"checkbox-group","required":false,"label":"Checkbox Group","toggle":false,"inline":false,"name":"checkbox-group-1587919679139","access":false,"other":false,"values":[{"label":"Option 1","value":"option-1","selected":true}]},{"type":"number","required":false,"label":"Number","className":"form-control","name":"number-1587919679550","access":false},{"type":"number","required":false,"label":"Number","className":"form-control","name":"number-1587919679729","access":false},{"type":"date","required":false,"label":"Date Field","className":"form-control","name":"date-1587919680353","access":false},{"type":"checkbox-group","required":false,"label":"Checkbox Group","toggle":false,"inline":false,"name":"checkbox-group-1587919680769","access":false,"other":false,"values":[{"label":"Option 1","value":"option-1","selected":true}]}]',
//     name: "Important",
//     dateCreated: "2020-04-26T13:10:02.194Z",
//     lastEdited: "2020-04-26T13:10:02.194Z",
//   },
//   {
//     form:
//       '[{"type":"header","subtype":"h1","label":"Create Your Form","access":false},{"type":"paragraph","subtype":"p","label":"Kindly add your contents here.","access":false},{"type":"checkbox-group","required":false,"label":"Checkbox Group","toggle":false,"inline":false,"name":"checkbox-group-1587919757556","access":false,"other":false,"values":[{"label":"Option 1","value":"option-1","selected":true}]},{"type":"number","required":false,"label":"Number","className":"form-control","name":"number-1587919757742","access":false},{"type":"textarea","required":false,"label":"Text Area","className":"form-control","name":"textarea-1587919757970","access":false,"subtype":"textarea"}]',
//     name: "dsaf",
//     dateCreated: "2020-04-26T13:10:02.194Z",
//     lastEdited: "2020-04-26T13:10:02.194Z",
//   },
// ];
