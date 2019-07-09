import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import queryString from 'query-string';

import searchIcon from '../../assets/search.svg';

const Search = styled.input`
  width: 220px;
  height: 34px;
  padding: 20px 50px 20px 12px;
  border-radius: 16px;
  text-align: end;
  color: #fff;
  font-size: 19px;
  font-weight: 500;
  background: #777777 url(${searchIcon}) no-repeat 93%;

  &::placeholder {
    color: #acacac;
  }
`;

class SearchBar extends Component {
  state = {
    input: '',
  };

  async componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    if (query && query.search) {
      this.setState({ input: query.search });
    }
  }

  handleInputChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { input } = this.state;
    const { onSearch } = this.props;

    if (onSearch) onSearch(input);
  };

  render() {
    const { input } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Search
          type="text"
          placeholder="Search by name..."
          value={input}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

export default withRouter(SearchBar);
