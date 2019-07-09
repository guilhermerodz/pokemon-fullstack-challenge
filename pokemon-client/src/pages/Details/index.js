import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import api from '../../services/api';

import util from '../../util';

import {
  Container,
  Cards,
  Card,
  Stats,
  StatBar,
  Tag,
  Tags,
  Title,
} from './styles';

import Header from '../../components/Header';
import AdminContainer from '../../components/AdminContainer';
import PaginationButtons from '../../components/PaginationButtons';

import Logout from '../../components/Logout';

class Details extends Component {
  state = {
    current: -1,
    pokemon: null,
    evolutions: [],
    loading: true,
  };

  async componentDidMount() {
    await this.refreshPokemon();
  }

  refreshPokemon = async () => {
    const { match } = this.props;

    let { pokedex } = match.params;
    pokedex = parseInt(pokedex);

    const response = await api.get(`/pokemons/${pokedex}`, {
      params: {
        includeTypes: true,
      },
    });

    const pokemon = response.data[0];

    const evolutions = [
      {
        pokedex: pokemon.pokedex,
        external_picture: pokemon.external_picture,
      },
    ];

    if (pokemon.previous_evolution) {
      const res = await api.get(`/pokemons/${pokemon.previous_evolution}`);

      if (res.data) {
        const prev = res.data;

        evolutions.unshift({
          pokedex: prev.pokedex,
          external_picture: prev.external_picture,
        });

        if (prev.previous_evolution) {
          const resp = await api.get(`/pokemons/${prev.previous_evolution}`);

          if (resp.data) {
            const previ = resp.data;
            evolutions.unshift({
              pokedex: previ.pokedex,
              external_picture: previ.external_picture,
            });
          }
        }
      }
    }

    if (pokemon.next_evolution) {
      const res = await api.get(`/pokemons/${pokemon.next_evolution}`);

      if (res.data) {
        const next = res.data;

        evolutions.push({
          pokedex: next.pokedex,
          external_picture: next.external_picture,
        });

        if (next.next_evolution) {
          const resp = await api.get(`/pokemons/${next.next_evolution}`);

          if (resp.data) {
            const nextEvo = resp.data;
            evolutions.push({
              pokedex: nextEvo.pokedex,
              external_picture: nextEvo.external_picture,
            });
          }
        }
      }
    }

    console.log(evolutions);

    await this.setState({
      pokemon,
      evolutions,
      loading: false,
      current: pokedex,
    });
  };

  previousPage = (count = 1) => {
    const { current } = this.state;
    if (current > 1) this.handlePage(Math.max(1, current - count));
  };

  nextPage = (count = 1) => {
    const { current } = this.state;
    this.handlePage(current + count);
  };

  handlePage = async newPage => {
    await this.props.history.push(`${newPage}`);

    await this.refreshPokemon();
  };

  handleOnSearch = async search => {
    await this.props.history.push(`/dashboard?search=${search}`);
  };

  render() {
    const { current, pokemon, loading, evolutions } = this.state;
    const [previousPage, nextPage] = [current - 1, current + 1];
    const p = pokemon;

    return (
      <>
        <Header enableSearch onSearch={this.handleOnSearch} />
        <Container>
          <Cards>
            {!loading && p && (
              <>
                <Card>
                  <div className="pokemon-image">
                    <img src={p.external_picture} alt={p.name} />
                  </div>
                  <div className="pokemon-info">
                    <Tags className="pokemon-tags">
                      <Tag>
                        <span>{`Nº${util.pad(p.id, 3)}`}</span>
                      </Tag>
                      <div>
                        {p.type.map(t => (
                          <Tag key={`${p.name}_${t.type}`} typeColor={t.color}>
                            <span>{util.capitalize(t.type)}</span>
                          </Tag>
                        ))}
                      </div>
                    </Tags>
                    <Title>
                      <strong>{util.capitalize(p.name)}</strong>
                    </Title>
                  </div>
                </Card>
                <Stats>
                  <div className="stat-container">
                    <strong>Stats</strong>
                    <br />
                    <div className="stat">
                      <div className="bar">
                        <StatBar amount={p.hp} />
                      </div>
                      <span>Vitalidade</span>
                    </div>
                    <div className="stat">
                      <div className="bar">
                        <StatBar amount={p.attack} />
                      </div>
                      <span>Ataque</span>
                    </div>
                    <div className="stat">
                      <div className="bar">
                        <StatBar amount={p.defense} />
                      </div>
                      <span>Defesa</span>
                    </div>
                    <div className="stat">
                      <div className="bar">
                        <StatBar amount={p.spa} />
                      </div>
                      <span>Ataque especial</span>
                    </div>
                    <div className="stat">
                      <div className="bar">
                        <StatBar amount={p.spd} />
                      </div>
                      <span>Defesa especial</span>
                    </div>
                    <div className="stat">
                      <div className="bar">
                        <StatBar amount={p.speed} />
                      </div>
                      <span>Velocidade</span>
                    </div>
                  </div>

                  <div className="info">
                    <div className="attribute">
                      <strong>Altura</strong>
                      <span>{p.height} m</span>
                    </div>
                    <div className="attribute">
                      <strong>Peso</strong>
                      <span>{p.weight} kg</span>
                    </div>
                    <div className="attribute">
                      <strong>Geração</strong>
                      <span>{p.generation}º</span>
                    </div>
                  </div>

                  <div className="evolutions">
                    {evolutions.map(evo => (
                      <div key={p.name + p.pokedex + evo.pokedex}>
                        <img
                          src={evo.external_picture}
                          alt={evo.pokedex}
                          onClick={() => this.handlePage(evo.pokedex)}
                        />
                      </div>
                    ))}
                  </div>
                </Stats>
              </>
            )}
          </Cards>

          <AdminContainer
            editLink={`/edit/${current}`}
            deleteLink={`/delete/${current}`}
          />

          <div className="container-footer">
            <PaginationButtons
              previousText={previousPage}
              currentText={current}
              nextText={nextPage}
              previous={previousPage > 0 && (() => this.previousPage())}
              current={() => this.refreshPokemon()}
              next={() => this.nextPage()}
              skip={() => this.nextPage(2)}
            />
          </div>
        </Container>
        <Logout />
      </>
    );
  }
}

export default withRouter(Details);
