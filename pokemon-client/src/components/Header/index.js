import React from 'react';
import { Link } from 'react-router-dom';

import { Header } from './styles';

import logo from '../../assets/logo.svg';

import SearchBar from '../SearchBar';
import FilterBar from '../FilterBar';

export default props => {
  const { enableSearch, enableFilter, onSearch, onFilter } = props;

  return (
    <Header>
      <div>
        <div className="header-left-content">
          {enableSearch && <SearchBar onSearch={onSearch || 0} />}
        </div>
        <div className="header-right-content">
          {enableFilter && <FilterBar onFilter={onFilter || 0} />}
        </div>
      </div>
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
    </Header>
  );
};
