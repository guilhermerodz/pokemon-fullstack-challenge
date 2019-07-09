import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';
import Container from '../../components/Container';

import { Form } from './styles';

class Edit extends Component {
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
    loading: true,
  };

  async componentDidMount() {
    await this.loadTypes();
    await this.loadPokemon();
  }

  loadTypes = async () => {
    const response = await api.get('/types');

    this.setState({ allTypes: response.data });
  };

  loadPokemon = async () => {
    const { match } = this.props;

    let { pokedex } = match.params;
    pokedex = parseInt(pokedex);

    const response = await api.get(`/pokemons/${pokedex}`);

    const pokemon = response.data;

    const {
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
      type,
    } = pokemon;

    const type1 = type[0];
    const type2 = type.length > 1 ? type[1] : null;

    this.setState({
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
      previous_evolution: previous_evolution || '',
      next_evolution: next_evolution || '',
      type1,
      type2,
      loading: false,
    });
  };

  validate = async () => {
    const {
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

  handleEdit = async e => {
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
      await api.put(`/pokemons/${pokedex}`, pokemon);

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
    if (pos === 1) await this.setState({ type1: parseInt(e.target.value) });
    if (pos === 2) await this.setState({ type2: parseInt(e.target.value) });
  };

  render() {
    const { loading, error, external_picture, allTypes } = this.state;
    const {
      generation,
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

    return (
      <>
        <Header />
        <Container>
          {!loading && (
            <Form onSubmit={this.handleEdit}>
              {error && <p>{error}</p>}
              <div className="picture">
                <img src={external_picture} alt="" />
              </div>
              <input
                type="text"
                value={external_picture}
                placeholder="URL da imagem"
                onChange={e => this.handleInputChange('external_picture', e)}
              />
              <hr />
              <input
                type="number"
                placeholder="Geração"
                value={generation}
                onChange={e => this.handleInputChange('generation', e)}
              />
              <input
                type="text"
                value={name}
                placeholder="Nome"
                onChange={e => this.handleInputChange('name', e)}
              />
              <select onChange={e => this.handleTypeChange(1, e)} value={type1}>
                {allTypes.map(type => {
                  return (
                    <option key={`type1_${type.id}`} value={type.id}>
                      {type.type}
                    </option>
                  );
                })}
              </select>
              <select onChange={e => this.handleTypeChange(2, e)} value={type2}>
                <option value={null}>Tipo secundário</option>
                {allTypes.map(type => {
                  return (
                    <option key={`type1_${type.id}`} value={type.id}>
                      {type.type}
                    </option>
                  );
                })}
              </select>
              <input
                type="number"
                value={height}
                placeholder="Altura"
                onChange={e => this.handleInputChange('height', e)}
              />
              <input
                type="number"
                value={weight}
                placeholder="Peso"
                onChange={e => this.handleInputChange('weight', e)}
              />
              <input
                type="number"
                value={hp}
                placeholder="Vitalidade"
                onChange={e => this.handleInputChange('hp', e)}
              />
              <input
                type="number"
                value={attack}
                placeholder="Ataque"
                onChange={e => this.handleInputChange('attack', e)}
              />
              <input
                type="number"
                value={defense}
                placeholder="Defesa"
                onChange={e => this.handleInputChange('defense', e)}
              />
              <input
                type="number"
                value={spa}
                placeholder="Ataqueespecial"
                onChange={e => this.handleInputChange('spa', e)}
              />
              <input
                type="number"
                value={spd}
                placeholder="Defesa especial"
                onChange={e => this.handleInputChange('spd', e)}
              />
              <input
                type="number"
                value={speed}
                placeholder="Velocidade"
                onChange={e => this.handleInputChange('speed', e)}
              />
              <input
                type="number"
                value={previous_evolution}
                placeholder="ID anterior (deixe em branco para nenhuma)"
                onChange={e => this.handleInputChange('previous_evolution', e)}
              />
              <input
                type="number"
                value={next_evolution}
                placeholder="ID da evolução (deixe em branco para nenhuma)"
                onChange={e => this.handleInputChange('next_evolution', e)}
              />
              <button type="submit">Salvar</button>
            </Form>
          )}
        </Container>
      </>
    );
  }
}

export default withRouter(Edit);
