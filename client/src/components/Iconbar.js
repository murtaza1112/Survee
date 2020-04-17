import React from "react";
import "./Iconbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function IconBar() {
  return (
    <div className="icon-bar">
      <a href="#" className="facebook">
        <FontAwesomeIcon icon={faFacebook} transform="grow-30" />
      </a>
      <a href="#" className="instagram ">
        <FontAwesomeIcon icon={faInstagram} transform="grow-30" />
      </a>
      <a href="#" className="linkedin">
        <FontAwesomeIcon icon={faLinkedin} transform="grow-30" />
      </a>
      <a href="#" className="github">
        <FontAwesomeIcon icon={faGithub} transform="grow-30" />
      </a>
    </div>
  );
}

export default IconBar;
