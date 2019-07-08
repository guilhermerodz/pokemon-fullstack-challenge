import React, { Component } from 'react';

import api from '../../services/api';

import util from '../../util';

import {
  Container,
  Cards,
  Card,
  Tag,
  Tags,
  Title,
  CreateButton,
} from './styles';

import Header from '../../components/Header';

export default class Dashboard extends Component {
  state = {
    pokemons: [],
    types: [],
    page: 1,
  };

  async componentDidMount() {
    const { page } = this.state;

    const pokemons = await api.get('/pokemons', {
      params: {
        page,
      },
    });
    this.setState({ pokemons: pokemons.data });
  }

  getTypeData(id) {
    const { types } = this.state;

    if (!types) return { type: 'loading', color: '6e6e6e' };

    return types.find(t => t.id === id);
  }

  render() {
    const { pokemons } = this.state;

    return (
      <>
        <Header enableSearch enableFilter />
        <Container>
          <Cards>
            {pokemons.map(p => (
              <Card key={p.name}>
                <div className="pokemon-image">
                  <img src={p.external_picture} alt="" />
                </div>
                <div className="pokemon-info">
                  <Tags className="pokemon-tags">
                    <Tag>
                      <span>{`Nº${util.pad(p.id, 3)}`}</span>
                    </Tag>
                    <div>
                      {p.type.map(t => (
                        <Tag key={p.name + t.id}>
                          <span>{t}</span>
                        </Tag>
                      ))}
                    </div>
                  </Tags>
                  <Title>
                    <strong>{util.capitalize(p.name)}</strong>
                  </Title>
                </div>
              </Card>
            ))}
          </Cards>

          <div className="admin">
            <CreateButton />
          </div>
        </Container>
      </>
    );
  }
}
