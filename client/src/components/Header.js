import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payment from "./Payment";
import { Navbar, Nav, Button, Spinner } from "react-bootstrap";
import "./Header.css";

// class Header extends React.Component {
//   renderContent() {
//     console.log(this.props.auth);
//     switch (this.props.auth) {
//       case null:
//         return;

//       case false:
//         return (
//           <li>
//             <a href="/auth/google">Google Login</a>
//           </li>
//         );

//       default:
//         return [
//           <li key="2">
//             <Payment />
//           </li>,
//           <li key="1" style={{ margin: "0 10px" }}>
//             Credits:{this.props.auth.credits}
//           </li>,
//           <li key="3">
//             <a href="/api/logout">LogOut</a>
//           </li>,
//         ];
//     }
//   }

//   render() {
//     return (
//       <div>
//         <nav>
//           <div className="nav-wrapper ">
// <Link
//   to={this.props.auth ? "/surveys" : "/"}
//   className="left brand-logo"
// >
//               Servee
//             </Link>
//             <ul id="nav-mobile" className="right hide-on-med-and-down">
// {this.renderContent()}
//             </ul>
//           </div>
//         </nav>
//       </div>
//     );
//   }
// }

// class Header extends React.Component {
//   renderContent() {
//     console.log(this.props.auth);
//     switch (this.props.auth) {
//       case null:
//         return (
//           <Button variant="light" disabled>
//             <Spinner
//               as="span"
//               animation="border"
//               size="md"
//               role="status"
//               aria-hidden="true"
//             />
//             <span className="sr-only">Loading...</span>
//           </Button>
//         );

//       case false:
//         return (
//           <Nav.Link eventKey={2} href="/auth/google">
//             <Button variant="secondary">Google Login</Button>
//           </Nav.Link>
//         );

//       default:
//         return [
//           <Nav key="1">
//             <Payment />
//           </Nav>,
//           <Nav.Link
//             eventKey={2}
//             href="/#"
//             style={{ paddingTop: "14px" }}
//             key="2"
//           >
//             Credits: {this.props.auth.credits}
//           </Nav.Link>,
//           <Nav.Link eventKey={2} href="/api/logout" key="3">
//             <Button variant="outline-dark">Logout</Button>
//           </Nav.Link>,
//         ];
//     }
//   }

//   render() {
//     return (
//       <Navbar collapseOnSelect expand="lg" bg="light">
//         <Navbar.Brand>
// <Link
//   to={this.props.auth ? "/surveys" : "/"}
//   style={({ textDecoration: "none" }, { color: "black" })}
// >
// Survee
// </Link>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="mr-auto"></Nav>
//           <Nav>{this.renderContent()}</Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return { auth: state.auth };
// };
// export default connect(mapStateToProps)(Header);

class Header extends React.Component {
  renderContent() {
    console.log(this.props.auth);
    switch (this.props.auth) {
      case null:
        return (
          <li>
            <Spinner
              as="span"
              animation="border"
              size="md"
              role="status"
              aria-hidden="true"
            />
          </li>
        );

      case false:
        return (
          <li>
            <a href="/auth/google">Google Login</a>
          </li>
        );

      default:
        return [
          <li>
            <Link to="/">Home</Link>
          </li>,
          <li>
            <Link to="/surveys">Dashboard</Link>
          </li>,
          <li>
            <Link to="/forms/create">Create Form</Link>
          </li>,
          <li>
            <Link to="/forms">My Forms</Link>
          </li>,
          <li key="1">
            <Payment />
          </li>,
          <li>Credits: {this.props.auth.credits}</li>,
          <li href="/api/logout">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }

  render() {
    return (
      <div>
        <div class="header">
          <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu" />
          <label for="openSidebarMenu" class="sidebarIconToggle">
            <div class="spinner diagonal part-1"></div>
            <div class="spinner horizontal"></div>
            <div class="spinner diagonal part-2"></div>
          </label>
          <div id="sidebarMenu">
            <ul class="sidebarMenuInner">{this.renderContent()}</ul>
          </div>
          <div
            style={{ float: "right", paddingRight: "10px", paddingTop: "20px" }}
          >
            <Link
              to={this.props.auth ? "/surveys" : "/"}
              className="Survee"
              style={({ textDecoration: "none" }, { color: "black" })}
            >
              Survee
            </Link>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Header);
