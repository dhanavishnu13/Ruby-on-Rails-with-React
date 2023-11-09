import React, { Component } from "react";
import Login from "../features/auth/login";
import { Link, Navigate } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth1 = this.handleSuccessfulAuth1.bind(this);
  }

  handleSuccessfulAuth1(data) {
    this.props.handleLogin(data);
    
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <Login
          handleSuccessfulAuth={this.handleSuccessfulAuth1}
        />
        <p>
          Don't have an account? <Link to="/registration">Register</Link>
        </p>
      </div>
    );
  }
}