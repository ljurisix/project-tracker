import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { NavigationService, persistor, store } from '../../common';
import { AuthRouter, AuthRoutes, ROOT_PATH_AUTH } from '../auth';
import { AppRouter, ROOT_PATH_APP } from '../app';

function MainRouter() {
  let routes = [
    {
      path: ROOT_PATH_AUTH,
      component: AuthRouter,
      roles: [],
      exact: false,
    },
    {
      path: ROOT_PATH_APP,
      component: AppRouter,
      roles: [],
      exact: false,
    },
  ];

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router ref={(navigatorRef: any) => NavigationService.setTopLevelNavigator(navigatorRef)}>
          <Switch>
            {routes.map((route, index) => (
              <Route exact={route.exact} path={`/${route.path}`} key={index}>
                {' '}
                <route.component />{' '}
              </Route>
            ))}
            <Redirect to={AuthRoutes.LOGIN.fullPath} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default MainRouter;
