import React, { Component } from 'react';
import styled from 'styled-components';

import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Container = styled.form`
  width: 500px;

  ${props => props.invalid && 'border: 5px solid red;'}
`;

Modal.setAppElement('#root');

export default class extends Component {
  constructor() {
    super();

    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  state = {
    options: [
      ['pokedex', 'Número', true],
      ['generation', 'Geração'],
      ['name', 'Nome'],
      ['height', 'Altura'],
      ['weight', 'Peso'],
      ['hp', 'Vitalidade'],
      ['attack', 'Ataque'],
      ['defense', 'Defesa'],
      ['spa', 'Ataque especial'],
      ['spd', 'Defesa especial'],
      ['speed', 'Velocidade'],
    ],
    filterOptions: [
      ['pokedex', 'Número', true],
      ['generation', 'Geração'],
      ['height', 'Altura'],
      ['weight', 'Peso'],
      ['hp', 'Vitalidade'],
      ['attack', 'Ataque'],
      ['defense', 'Defesa'],
      ['spa', 'Ataque especial'],
      ['spd', 'Defesa especial'],
      ['speed', 'Velocidade'],
    ],
    operators: [['gt', '>', true], ['lt', '<'], ['gte', '>='], ['lte', '<=']],
  };

  afterOpenModal() {}

  // <button onClick={onCloseModal}>close</button>
  render() {
    const { options, filterOptions, operators } = this.state;
    const {
      invalid,
      open,
      onCloseModal,
      handleField,
      handleOrder,
      filtered,
      handleFiltered,
      handleFilterField,
      handleFilterOp,
      handleFilterValue,
      handleOnSubmit,
    } = this.props;

    return (
      <div>
        <Modal
          isOpen={open}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={onCloseModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Container onSubmit={handleOnSubmit} invalid={invalid}>
            <div>
              <span>Ordenar por </span>
              <select onChange={handleField}>
                {options.map(o => {
                  return o[2] ? (
                    <option key={`field_${o[0]}`} value={o[0]} defaultValue>
                      {o[1]}
                    </option>
                  ) : (
                    <option key={`field_${o[0]}`} value={o[0]}>
                      {o[1]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <span>Ordem </span>
              <select onChange={handleOrder}>
                <option value="ASC" defaultValue>
                  Crescente
                </option>
                <option value="DESC">Decrescente</option>
              </select>
            </div>
            <div>
              <input
                type="checkbox"
                value="filtered"
                onChange={handleFiltered}
              />
              <span>Em que </span>
              <select onChange={handleFilterField} disabled={!filtered}>
                {filterOptions.map(o => {
                  return o[2] ? (
                    <option
                      key={`filterField_${o[0]}`}
                      value={o[0]}
                      defaultValue
                    >
                      {o[1]}
                    </option>
                  ) : (
                    <option key={`filterField_${o[0]}`} value={o[0]}>
                      {o[1]}
                    </option>
                  );
                })}
              </select>
              <span> seja </span>
              <select onChange={handleFilterOp} disabled={!filtered}>
                {operators.map(o => {
                  return o[2] ? (
                    <option key={`filterOp${o[0]}`} value={o[0]} defaultValue>
                      {o[1]}
                    </option>
                  ) : (
                    <option key={`filterOp${o[0]}`} value={o[0]}>
                      {o[1]}
                    </option>
                  );
                })}
              </select>
              <input
                type="number"
                onChange={handleFilterValue}
                disabled={!filtered}
              />
            </div>
            <button type="submit">Filtrar</button>
          </Container>
        </Modal>
      </div>
    );
  }
}
