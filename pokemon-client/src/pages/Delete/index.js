import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';

class Delete extends Component {
  async componentDidMount() {
    const { match } = this.props;

    let { pokedex } = match.params;
    pokedex = parseInt(pokedex);

    await api.delete(`/pokemons/${pokedex}`);

    await this.props.history.push('/');
  }

  render() {
    return (
      <>
        <Header />
        <h1>Deletando...</h1>
      </>
    );
  }
}

export default withRouter(Delete);
