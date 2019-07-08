import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Header } from './styles';

import logo from '../../assets/logo.svg';

export default class extends Component {
  state = {
    enableSearch: this.props.enableSearch,
    enableFilter: this.props.enableFilter,
  };

  render() {
    const { enableSearch, enableFilter } = this.state;

    return (
      <Header>
        <div>
          <div className="header-left-content">
            {enableSearch && <span>Search</span>}
          </div>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="header-right-content">
            {enableFilter && <span>Filter</span>}
          </div>
        </div>
      </Header>
    );
  }
}
