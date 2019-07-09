import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { isAuthenticated, logout } from '../../services/auth';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  button {
    margin-top: 15px;
    margin-bottom: 15px;

    text-decoration: none;

    font-size: 20px;
    font-weight: bold;
    text-align: center;

    border-radius: 10px;
    padding: 10px;
    color: #fff;
    background: #404040;
  }
`;

class Logout extends Component {
  handleLogout = async () => {
    await logout();
    await this.props.history.push('/');
  };

  render() {
    return (
      <>
        {isAuthenticated() && (
          <>
            <Container>
              <button type="button" onClick={() => this.handleLogout()}>
                Logout
              </button>
            </Container>
          </>
        )}
      </>
    );
  }
}

export default withRouter(Logout);
