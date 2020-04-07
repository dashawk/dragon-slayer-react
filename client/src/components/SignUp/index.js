import React, { Component } from 'react';
import './style.css';
import { Redirect } from "react-router-dom";
import { HOME } from "../../constants/routes";

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  registering: false,
  error: null
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };
  }

  back = () => {
    this.props.history.push(HOME);
  };
  postRegister() {
    fetch('https://afternoon-fjord-41444.herokuapp.com/api/register', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ registering: false });
        this.props.history.push(HOME);
      });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.setState({ registering: true });
    this.postRegister();
  };

  render() {
    const { firstName, lastName, email, password, confirmPassword, error } = this.state;
    const isInvalid = password !== confirmPassword || password === '' || email === '';
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;

    if (isLoggedIn) {
      return <Redirect to={HOME} />
    }

    return (
      <div className="register container">
        <div className="register-box">
          <h2 className="register-title">Registration Area</h2>
          <form onSubmit={this.onSubmit} noValidate>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              autoComplete="off"
              onChange={this.onChange}
              placeholder="First Name" />

            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              autoComplete="off"
              onChange={this.onChange}
              placeholder="Last Name" />

            <label>Email</label>
            <input
              type="text"
              name="email"
              value={email}
              autoComplete="off"
              onChange={this.onChange}
              placeholder="Email Address" />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.onChange}
              placeholder="Password" />
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.onChange}
              placeholder="Confirm Password" />

            {error ? <div className="error-container">{error.message}</div> : ''}
            { this.state.registering ? <div className="centered" sty="color: #49aaff">I will now register you. Please wait...</div> : ''}
            {this.state.password !== this.state.confirmPassword ?
              <div className="error-container">Password did not match</div> : ''}

            <div className="buttons">
              <button disabled={isInvalid || this.state.registering} type="submit">Register</button>
              <button disabled={this.state.registering} type="button" onClick={this.back}>Back</button>
            </div>
          </form>
        </div>
        <div className="footer">Created by: Jason Panugaling</div>
      </div>
    );
  }
}

export default Register