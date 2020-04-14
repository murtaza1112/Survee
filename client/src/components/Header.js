import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payment from "./Payment";
class Header extends React.Component {
  renderContent() {
    console.log(this.props.auth);
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <li>
            <a href="/auth/google">Google Login</a>
          </li>
        );

      default:
        return [
          <li key="2">
            <Payment />
          </li>,
          <li key="1" style={{ margin: "0 10px" }}>
            Credits:{this.props.auth.credits}
          </li>,
          <li key="3">
            <a href="/api/logout">LogOut</a>
          </li>,
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Servee
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Header);
