import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const {
      email,
      password,
      password_confirmation
    } = this.state;
    axios
      .post(
        "http://localhost:3000/registrations",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        // console.log(response.data)
        // if (response.status ==200) {
        //   console.log("Registration data", response.data)
        // }
        if (response.status ==200){
        this.props.handleSuccessfulAuth(response)
        }
      })
      .catch(error => {
        console.log("registration error", error);
      });

    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="container max-w-screen-lg mx-auto">
        <h3>Sign Up Form</h3>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
            <br/>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
          <br/>
            <input
              className="form-control"
              type="password"
              name="password_confirmation"
              placeholder="Password Confirmation"
              required
              value={this.state.password_confirmation}
              onChange={this.handleChange}
            />
          </div>
          <br/>
          <button type="submit" className="btn btn-primary btn-sm">
            Sign Up
          </button>
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}