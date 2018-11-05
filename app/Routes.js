import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import FormPage from './containers/form-page';
import FinalPage from './containers/final-page';
import CatalogsPage from './containers/catalogs-page';

export default () => (
  <App>
    <Switch>
      <Route path={routes.FINAL} component={FinalPage} />
      <Route path={routes.FORM} component={FormPage} />
      <Route path={routes.CATALOGS} component={CatalogsPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
