import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import api from '../../services/api';
import { login, isAuthenticated } from '../../services/auth';

import Header from '../../components/Header';
import Container from '../../components/Container';

import { Form } from './styles';

class Login extends Component {
  state = {
    nickname: '',
    password: '',
    error: '',
  };

  async componentWillMount() {
    if (isAuthenticated()) this.props.history.push('/dashboard');
  }

  validate = async () => {
    const { nickname, password } = this.state;

    if (!nickname || !password) {
      this.setState({ error: 'Preencha todos os dados.' });
      return;
    }

    this.setState({ error: '' });
  };

  handleLogin = async e => {
    e.preventDefault();

    await this.validate();

    const { error } = this.state;

    if (error) return;

    const { nickname, password } = this.state;

    try {
      const response = await api.post('/sessions', { nickname, password });
      login(response.data.token);
      this.props.history.push('/dashboard');
    } catch (err) {
      this.setState({
        error: 'Houve um problema com o login. Verifique suas credenciais.',
      });
    }
  };

  handleInputChange = (field, e) => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const { error } = this.state;

    return (
      <>
        <Header />
        <Container>
          <Form onSubmit={this.handleLogin}>
            {error && <p>{error}</p>}
            <input
              type="text"
              placeholder="Apelido único"
              onChange={e => this.handleInputChange('nickname', e)}
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={e => this.handleInputChange('password', e)}
            />
            <button type="submit">Entrar</button>
            <hr />
            <Link to="/signup">Criar conta</Link>
          </Form>
        </Container>
      </>
    );
  }
}

export default withRouter(Login);
