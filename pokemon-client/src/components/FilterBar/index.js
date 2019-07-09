import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import * as Yup from 'yup';

import queryString from 'query-string';

import filterIcon from '../../assets/filter.svg';

import FilterModal from './FilterModal';

const Filter = styled.button`
  width: 220px;
  padding: 6px 9px;
  border-radius: 9px;
  text-align: end;
  color: #fff;
  font-size: 19px;
  font-weight: 500;
  background: #545454;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    flex-shrink: 0;
    margin-right: 10px;
  }

  span {
    font-size: 19px;
    font-weight: normal;
  }

  &::placeholder {
    color: #acacac;
  }
`;

class FilterBar extends Component {
  state = {
    filtered: false,
    filter: {
      field: 'pokedex',
      order: 'ASC',
      filterField: 'pokedex',
      filterOp: 'gt',
      filterValue: 0,
    },
    modal: false,
    invalid: false,
  };

  async componentDidMount() {
    // this.loadFilterFromQuery();
  }

  loadFilterFromQuery = async () => {
    const query = queryString.parse(this.props.location.search);

    const filter = {};
    if (Object.keys(query).length > 0) {
      const { field, order } = query;
      if (query.field && query.order) {
        filter.field = field;
        filter.order = order;
      }

      const { filterField, filterOp, filterValue, filterValueType } = query;
      if (filterField && filterOp && filterValue && filterValueType) {
        filter.filterField = filterField;
        filter.filterOp = filterOp;
        filter.filterValue = filterValue;
        filter.filterValueType = filterValueType;
      }

      this.setState({ filter });
    }
  };

  handleInputChange = e => {
    this.setState({ input: e.target.value });
  };

  handleModal = async open => {
    await this.setState({ modal: open });
  };

  handleField = async e => {
    const { filter } = this.state;

    const field = e.target.value;

    filter.field = field;

    if (!filter.order) filter.order = 'ASC';

    await this.setState({ filter });
  };

  handleOrder = async e => {
    const { filter } = this.state;

    const order = e.target.value;

    filter.order = order;

    await this.setState({ filter });
  };

  handleFiltered = async e => {
    const filtered = e.target.checked;

    await this.setState({ filtered });
  };

  handleFilterField = async e => {
    const { filter } = this.state;

    const filterField = e.target.value;

    filter.filterField = filterField;

    await this.setState({ filter });
  };

  handleFilterOp = async e => {
    const { filter } = this.state;

    const filterOp = e.target.value;

    filter.filterOp = filterOp;

    await this.setState({ filter });
  };

  handleFilterValue = async e => {
    const { filter } = this.state;

    const filterValue = e.target.value;

    filter.filterValue = filterValue;

    await this.setState({ filter });
  };

  handleOnSubmit = async e => {
    e.preventDefault();

    const { filter, filtered } = this.state;

    const { field, order } = filter;

    const query = {
      field,
      order,
    };

    if (filtered) {
      const { filterField, filterOp, filterValue } = filter;

      if (!Yup.number().isValid(filterValue)) {
        await this.setState({ invalid: true });
        return;
      }
      if (!filterField || !filterOp) {
        await this.setState({ invalid: true });
        return;
      }

      query.filterField = filterField;
      query.filterOp = filterOp;
      query.filterValue = parseInt(filterValue);
    }

    await this.setState({ invalid: false });

    const { onFilter } = this.props;

    if (onFilter) onFilter(query);
  };

  render() {
    const { modal, filtered, invalid } = this.state;

    return (
      <>
        <Filter onClick={() => this.handleModal(true)}>
          <img src={filterIcon} alt="Filter" />
          <span>Inserir filtros</span>
        </Filter>
        <FilterModal
          invalid={invalid}
          open={modal}
          onCloseModal={() => this.handleModal(false)}
          handleField={this.handleField}
          handleOrder={this.handleOrder}
          handleFiltered={this.handleFiltered}
          handleFilterField={this.handleFilterField}
          handleFilterOp={this.handleFilterOp}
          handleFilterValue={this.handleFilterValue}
          handleOnSubmit={this.handleOnSubmit}
          filtered={filtered}
        />
      </>
    );
  }
}

export default withRouter(FilterBar);
