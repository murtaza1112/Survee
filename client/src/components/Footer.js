import React from "react";
import "./Footer.css";
class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer" id="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <h4> About Me </h4>
                <p>Name:Murtaza Khumusi</p>
                <p>College:National Institute Of Technology, Durgapur</p>
                <p>Branch:Computer Science And Engineering</p>
              </div>
              <div className="col-lg-6 col-sm-6 col-xs-6">
                <h3> Contact </h3>
                <ul>
                  <li>
                    {" "}
                    <p> Email:murtaza1112@hotmail.com </p>{" "}
                  </li>
                  <br />
                  <li>
                    {" "}
                    <p>
                      Mahatma Gandhi Rd, A-Zone, Durgapur, West Bengal-713209
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <div className="container">
                <p className="center copyright">
                  {" "}
                  Copyright © Survee 2020. All rights reserved.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
