import React from "react";
import StrikeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";
class Payments extends React.Component {
  render() {
    return (
      <div>
        <StrikeCheckout
          name="Survee"
          description="App to get surveys from multiple users."
          amount={500}
          token={(token) => this.props.handleToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn">ADD CREDITS</button>
        </StrikeCheckout>
      </div>
    );
  }
}

export default connect(null, actions)(Payments);
