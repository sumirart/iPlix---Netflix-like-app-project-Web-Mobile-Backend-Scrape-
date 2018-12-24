import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import "../style.css";

// import component
import Nav from '../components/Nav/Nav'
import bgimg from './img/bg.jpg'

// Login form
import LoginForm from '../components/loginForm';

// import action
import { login } from '../../public/redux/actions/auth';

const Header = styled.header`
    background: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.75), 
                rgba(0, 0, 0, 0.09)
                ),
                url(${bgimg});
                height: 100vh;
    @media (max-width: 1000px) {
      height: 90vh;
    }
`;

class Login extends Component {
  state = {
    toHome: false
  }

  handleSubmit = value => {
    this.props.dispatch(login(value))
      .then(() => {
        this.setState({ toHome: true });
      })
      .catch(err => alert('Username or password wrong!'));
  }

  render() {
    console.log(this.props)
    if (this.state.toHome === true) {
      return <Redirect to="/" />
    }

    return (
      <Header>
        <Nav />
        <div className="form">
          <div style={{ width: "30%" }}>
            <LoginForm onSubmit={this.handleSubmit} />
          </div>
        </div>
      </Header>
    );
  }
}

export default connect()(Login);