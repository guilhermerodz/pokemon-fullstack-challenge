import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import Container from '../../components/Container';

import { Form } from './styles';

class Create extends Component {
  state = {
    pokedex: '',
    generation: '',
    external_picture: '',
    name: '',
    height: '',
    weight: '',
    type1: null,
    type2: null,
    hp: '',
    attack: '',
    defense: '',
    spa: '',
    spd: '',
    speed: '',
    previous_evolution: '',
    next_evolution: '',
    error: '',
    allTypes: [],
  };

  async componentDidMount() {
    const response = await api.get('/types');

    this.setState({ allTypes: response.data });
  }

  validate = async () => {
    try {
      const pokemonExists = await api.get(`/pokemons/${this.state.pokedex}`);
      if (pokemonExists) {
        this.setState({ error: 'Já existe um Pokémon com esse número!' });
        return;
      }
    } catch (error) {}

    const {
      pokedex,
      generation,
      external_picture,
      name,
      height,
      weight,
      hp,
      attack,
      defense,
      spa,
      spd,
      speed,
      previous_evolution,
      next_evolution,
      type1,
      type2,
    } = this.state;

    if (
      !pokedex ||
      !generation ||
      !external_picture ||
      !name ||
      !height ||
      !weight ||
      !hp ||
      !attack ||
      !defense ||
      !spa ||
      !spd ||
      !speed ||
      !type1
    ) {
      this.setState({ error: 'Preencha todos os dados.' });
      return;
    }

    if (type1 === type2) {
      this.setState({ error: 'Os tipos não podem ser iguais.' });
      return;
    }

    this.setState({ error: '' });
  };

  handleCreate = async e => {
    e.preventDefault();

    await this.validate();

    const { error } = this.state;

    if (error) return;

    const {
      pokedex,
      generation,
      external_picture,
      name,
      height,
      weight,
      hp,
      attack,
      defense,
      spa,
      spd,
      speed,
      previous_evolution,
      next_evolution,
      type1,
      type2,
    } = this.state;

    const type = [parseInt(type1)];
    if (type2) await type.push(parseInt(type2));

    const pokemon = {
      pokedex,
      generation,
      external_picture,
      name: name.toLowerCase().trim(),
      type,
      height: Number(height),
      weight: Number(weight),
      hp: parseInt(hp),
      attack: parseInt(attack),
      defense: parseInt(defense),
      spa: parseInt(spa),
      spd: parseInt(spd),
      speed: parseInt(speed),
      previous_evolution:
        previous_evolution.length > 0 ? parseInt(previous_evolution) : null,
      next_evolution:
        next_evolution.length > 0 ? parseInt(next_evolution) : null,
    };

    try {
      await api.post('/pokemons', pokemon);

      this.props.history.push(`/pokemon/${pokemon.pokedex}`);
    } catch (err) {
      console.log(err);
      this.setState({
        error: 'Ocorreu um erro. Verifique os logs do back-end.',
      });
    }
  };

  handleInputChange = async (field, e) => {
    await this.setState({ [field]: e.target.value });
  };

  handleTypeChange = async (pos, e) => {
    if (pos === 1) await this.setState({ type1: e.target.value });
    if (pos === 2) await this.setState({ type2: e.target.value });
  };

  render() {
    const { error, external_picture, allTypes } = this.state;

    return (
      <>
        <Header />
        <Container>
          <Form onSubmit={this.handleCreate}>
            {error && <p>{error}</p>}
            <div className="picture">
              <img src={external_picture} alt="" />
            </div>
            <input
              type="text"
              placeholder="URL da imagem"
              onChange={e => this.handleInputChange('external_picture', e)}
            />
            <hr />
            <input
              type="number"
              placeholder="Número"
              onChange={e => this.handleInputChange('pokedex', e)}
            />
            <input
              type="number"
              placeholder="Geração"
              onChange={e => this.handleInputChange('generation', e)}
            />
            <input
              type="text"
              placeholder="Nome"
              onChange={e => this.handleInputChange('name', e)}
            />
            <select onChange={e => this.handleTypeChange(1, e)}>
              <option value={null} defaultValue>
                Tipo primário
              </option>
              {allTypes.map(type => (
                <option key={`type1_${type.id}`} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
            <select onChange={e => this.handleTypeChange(2, e)}>
              <option value={null} defaultValue>
                Tipo secundário
              </option>
              {allTypes.map(type => (
                <option key={`type2_${type.id}`} value={type.id}>
                  {type.type}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Altura"
              onChange={e => this.handleInputChange('height', e)}
            />
            <input
              type="number"
              placeholder="Peso"
              onChange={e => this.handleInputChange('weight', e)}
            />
            <input
              type="number"
              placeholder="Vitalidade"
              onChange={e => this.handleInputChange('hp', e)}
            />
            <input
              type="number"
              placeholder="Ataque"
              onChange={e => this.handleInputChange('attack', e)}
            />
            <input
              type="number"
              placeholder="Defesa"
              onChange={e => this.handleInputChange('defense', e)}
            />
            <input
              type="number"
              placeholder="Ataqueespecial"
              onChange={e => this.handleInputChange('spa', e)}
            />
            <input
              type="number"
              placeholder="Defesa especial"
              onChange={e => this.handleInputChange('spd', e)}
            />
            <input
              type="number"
              placeholder="Velocidade"
              onChange={e => this.handleInputChange('speed', e)}
            />
            <input
              type="number"
              placeholder="ID anterior (deixe em branco para nenhuma)"
              onChange={e => this.handleInputChange('previous_evolution', e)}
            />
            <input
              type="number"
              placeholder="ID da evolução (deixe em branco para nenhuma)"
              onChange={e => this.handleInputChange('next_evolution', e)}
            />
            <button type="submit">Criar meu Pokémon!</button>
          </Form>
        </Container>
      </>
    );
  }
}

export default withRouter(Create);
