import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import api from '../../services/api';
import { isAuthenticated } from '../../services/auth';

import Header from '../../components/Header';
import Container from '../../components/Container';

import { Form } from './styles';

class SignUp extends Component {
  state = {
    nickname: '',
    password: '',
    confirmPassword: '',
    error: '',
  };

  async componentWillMount() {
    if (isAuthenticated()) this.props.history.push('/dashboard');
  }

  validate = async () => {
    const { nickname, password, confirmPassword } = this.state;

    if (!nickname || !password || !confirmPassword) {
      this.setState({ error: 'Preencha todos os dados.' });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: 'As senhas não coincidem.' });
      return;
    }

    if (password.length < 6) {
      this.setState({
        error: 'Use uma senha de, no mínimo, 6 caracteres.',
      });
      return;
    }

    this.setState({ error: '' });
  };

  handleSignUp = async e => {
    e.preventDefault();

    await this.validate();

    const { error } = this.state;

    if (error) return;

    const { nickname, password } = this.state;

    try {
      await api.post('/users', { nickname, password });
      this.props.history.push('/'); // Redirect user to home page
    } catch (err) {
      console.log(err);
      this.setState({ error: 'Ocorreu um erro ao registrar sua conta.' });
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
          <Form onSubmit={this.handleSignUp}>
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
            <input
              type="password"
              placeholder="Confirmar senha"
              onChange={e => this.handleInputChange('confirmPassword', e)}
            />
            <button type="submit">Criar minha conta!</button>
            <hr />
            <Link to="/">Fazer login</Link>
          </Form>
        </Container>
      </>
    );
  }
}

export default withRouter(SignUp);
