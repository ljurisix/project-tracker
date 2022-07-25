import React from 'react';
import { Layout } from 'antd';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoutes } from './app.routes';
import {
  ContentComponent,
  FooterComponent,
  HeaderComponent,
  NotFoundPageComponent,
  StoreStateInterface,
  UserRoleEnum,
} from '../../../common';
import DashboardPageComponent from '../dashboard/dashboardPage.component';

function AppRouter() {
  const userAuth = useSelector((state: StoreStateInterface) => state.auth);
  const { path } = useRouteMatch();

  let routes = [
    {
      path: AppRoutes.PROJECTS.path,
      component: DashboardPageComponent,
      exact: true,
    },
    {
      path: AppRoutes.PROJECTS.path + '/:id',
      component: DashboardPageComponent,
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
              {''}
              <route.component />
              {''}
            </Route>
          ))}
          <Route component={NotFoundPageComponent} />
        </Switch>
      </ContentComponent>
      <FooterComponent></FooterComponent>
    </Layout>
  );
}

export default AppRouter;
