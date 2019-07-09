import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';
import { logout } from '../../services/auth';

import util from '../../util';

import { Container, Cards, Card, Tag, Tags, Title } from './styles';

import Header from '../../components/Header';
import AdminContainer from '../../components/AdminContainer';
import PaginationButtons from '../../components/PaginationButtons';

import Logout from '../../components/Logout';

class Dashboard extends Component {
  state = {
    pokemons: [],
    search: '',
    query: {},
    page: 1,
    lastScrollPosition: null,
  };

  async componentDidMount() {
    await this.isAdmin();

    const query = queryString.parse(this.props.location.search);

    if (query && query.search) {
      await this.setState({ search: query.search });
    }

    if (query && query.field && query.order) {
      const { query: newQuery } = this.state;

      newQuery.field = query.field;
      newQuery.order = query.order;

      await this.setState({ query: newQuery });
    }

    if (query && query.filterField && query.filterOp && query.filterValue) {
      const { query: newQuery } = this.state;

      newQuery.filterField = query.filterField;
      newQuery.filterOp = query.filterOp;
      newQuery.filterValue = query.filterValue;

      await this.setState({ query: newQuery });
    }

    if (query && query.page) {
      await this.setState({ page: parseInt(query.page) });
    }

    await this.refreshPokemons();
  }

  isAdmin = async () => {
    const isAdmin = await api.get('/isAdmin').catch(error => {
      if (error.response) {
        if (error.response.status === 401) {
          toast('Você não é um administrador!');
          setTimeout(() => {
            toast('Faça login como usuário "admin" e senha "redfox"');
          }, 2000);
          setTimeout(() => {
            toast('Deslogando da conta em 5 segundos...');

            setTimeout(async () => {
              await logout();

              await this.props.history.push('/');
            }, 5000);
          }, 10000);
        }
      }
    });
  };

  refreshPokemons = async () => {
    const { page, search, query } = this.state;

    const config = {
      params: {
        page,
        includeTypes: true,
      },
    };

    if (search.length > 0) config.params.search = search;

    if (query.field && query.order) {
      const { field, order } = query;

      config.params.field = field;
      config.params.order = order;
    }

    if (query.filterField && query.filterOp && query.filterValue) {
      const { filterField, filterOp, filterValue } = query;

      config.params.filterField = filterField;
      config.params.filterOp = filterOp;
      config.params.filterValue = filterValue;
    }

    const pokemons = await api.get('/pokemons', config);

    this.setState({ pokemons: pokemons.data });
  };

  previousPage = (count = 1) => {
    const { page } = this.state;
    if (page > 1) this.handlePage(Math.max(1, page - count));
  };

  nextPage = (count = 1) => {
    const { page } = this.state;
    this.handlePage(page + count);
  };

  handlePage = async newPage => {
    await this.setState({ page: newPage });

    const { search, pathname } = this.props.location;
    const newQuery = queryString.parse(search);
    newQuery.page = newPage;

    await this.props.history.push(
      `${pathname}?${queryString.stringify(newQuery)}`
    );

    this.saveScrollPosition();

    await this.refreshPokemons();

    this.loadScrollPosition();
  };

  saveScrollPosition = () => {
    this.setState({ lastScrollPosition: window.pageYOffset });
  };

  loadScrollPosition = () => {
    const { lastScrollPosition } = this.state;
    setTimeout(() => window.scrollTo(0, lastScrollPosition), 200);
  };

  handleOnSearch = async pokemonName => {
    const { search, pathname } = this.props.location;
    const newQuery = queryString.parse(search);
    newQuery.search = pokemonName;

    await this.props.history.push(
      `${pathname}?${queryString.stringify(newQuery)}`
    );

    await this.setState({ page: 1, search: pokemonName });

    await this.refreshPokemons();
  };

  handleOnFilter = async query => {
    const { search, pathname } = this.props.location;
    const newQuery = queryString.parse(search);

    for (const key of Object.keys(query)) newQuery[key] = query[key];

    await this.props.history.push(
      `${pathname}?${queryString.stringify(newQuery)}`
    );

    await this.setState({ page: 1, query: newQuery });

    await this.refreshPokemons();
  };

  render() {
    const { pokemons, page } = this.state;
    const [previousPage, nextPage] = [page - 1, page + 1];

    return (
      <>
        <Header
          enableSearch
          enableFilter
          onSearch={this.handleOnSearch}
          onFilter={this.handleOnFilter}
        />
        <Container>
          <Cards>
            {pokemons.map(p => (
              <Link
                key={p.name}
                to={`/pokemon/${p.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card>
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
              </Link>
            ))}
          </Cards>

          <AdminContainer />

          <div className="container-footer">
            <PaginationButtons
              previousText={previousPage}
              currentText={page}
              nextText={nextPage}
              previous={previousPage > 0 && (() => this.previousPage())}
              current={() => this.refreshPokemons()}
              next={pokemons.length > 7 && (() => this.nextPage())}
              skip={pokemons.length > 7 && (() => this.nextPage(2))}
            />
            <div className="page-count">
              <span>Exibindo {pokemons.length} pokémons nessa página</span>
            </div>
          </div>
        </Container>
        <Logout />
        <ToastContainer />
      </>
    );
  }
}

export default withRouter(Dashboard);
