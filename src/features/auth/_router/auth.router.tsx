import React from 'react';
import { Layout } from 'antd';
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthRoutes } from './auth.routes';
import {
  ContentComponent,
  FooterComponent,
  HeaderComponent,
  NotFoundPageComponent,
  StoreStateInterface,
} from '../../../common';
import LoginPageComponent from '../login/loginPage.component';
import RegisterPageComponent from '../register/registerPage.component';
import { AppRoutes } from '../../app';

function AuthRouter() {
  const userAuth = useSelector((state: StoreStateInterface) => state.auth);

  const { path } = useRouteMatch();

  if (userAuth && userAuth.isAuthenticated) {
    return <Redirect to={AppRoutes.PROJECTS.fullPath} />;
  }

  let routes = [
    {
      path: AuthRoutes.LOGIN.path,
      component: LoginPageComponent,
      exact: true,
    },
    {
      path: AuthRoutes.REGISTER.path,
      component: RegisterPageComponent,
      exact: true,
    },
  ];

  return (
    <Layout className="layout">
      <HeaderComponent></HeaderComponent>
      <ContentComponent className="content site-container mt32">
        <Switch>
          {routes.map((route, index) => (
            <Route exact={route.exact} path={`${path}/${route.path}`} key={index}>
              {' '}
              <route.component />{' '}
            </Route>
          ))}
          <Route component={NotFoundPageComponent} />
        </Switch>
      </ContentComponent>
      <FooterComponent></FooterComponent>
    </Layout>
  );
}

export default AuthRouter;
