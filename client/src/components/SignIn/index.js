import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './style.css';
import {HOME} from "../../constants/routes";

const initialState = {
  email: '',
  password: '',
  loggingIn: false,
  error: null
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  postLogin(email, password) {
    fetch('https://afternoon-fjord-41444.herokuapp.com/api/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        const data = response.data;

        this.setState({ loggingIn: false });
        if (data.error) {
          this.setState({ error: { message: 'Invalid email or password' } });
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          this.props.history.push(HOME);
        }

      });
  }
  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    this.setState({ loggingIn: true });
    this.postLogin(email, password);
  };

  back = () => {
    this.props.history.push(HOME);
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;

    if (isLoggedIn) {
      return <Redirect to={HOME} />
    }

    return (
      <div className="login container">
        <div className="login-box">
          <h2 className="login-title">Cave Entrance</h2>
          <form onSubmit={this.onSubmit} noValidate>
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

            { error ? <div className="error-container">{ error.message }</div> : '' }

            <div className="buttons">
              <button disabled={ isInvalid || this.state.loggingIn } type="submit">{ this.state.loggingIn ? 'Loggin in' : 'Login' }</button>
              <button disabled={ this.state.loggingIn } type="button" onClick={this.back}>Back</button>
            </div>
          </form>
        </div>
        <div className="footer">Created by: Jason Panugaling</div>
      </div>
    );
  }
}

export default SignIn;
