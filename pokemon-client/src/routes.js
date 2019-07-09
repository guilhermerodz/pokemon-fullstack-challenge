import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Dashboard from './pages/Dashboard';
import Details from './pages/Details';

import Delete from './pages/Delete';
import Create from './pages/Create';
import Edit from './pages/Edit';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/pokemon/:pokedex" component={Details} />
      <PrivateRoute path="/delete/:pokedex" component={Delete} />
      <PrivateRoute path="/create" component={Create} />
      <PrivateRoute path="/edit/:pokedex" component={Edit} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);
