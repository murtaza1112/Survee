import React from "react";
import "./Landing.css";
class Landing extends React.Component {
  render() {
    return (
      <div>
        <div class="pimg2">
          <div class="ptext">
            <div class="space">
              <span class="border trans">Collect.</span>
            </div>
            <div class="space">
              <span class="border trans">Save.</span>
            </div>
            <div class="space">
              <span class="border trans">View.</span>
            </div>
          </div>
        </div>

        <section class="section section-dark">
          <h2>
            <b>
              <i>
                <u>Features</u>
              </i>
            </b>
          </h2>
          <div className="lists">
            <p>Create your own form using the custom form builder.</p>
            <p>Dispatch form to multiple clients using emails.</p>
            <p>View responses in the form of pie,doughnut and polar charts.</p>
            <p>Send multiple mails at nominal prices.</p>
          </div>
        </section>

        <div class="pimg3">
          <div class="ptext">
            <div class="space">
              <span class="border trans">Contact Me:</span>
            </div>
            <div class="space">
              <span class="border trans">survee@hotmail.com</span>
            </div>
          </div>
        </div>

        {/* <div class="pimg1">
          <div class="ptext">
            <span class="border">Traversy Media</span>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Landing;
