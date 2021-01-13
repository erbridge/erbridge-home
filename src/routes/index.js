import React from 'react';

import Books from '../pages/books.mdx';
import Home, { meta as homeMeta } from '../pages/home.mdx';

import {
  categoryRoutes as fictionCategoryRoutes,
  route as fictionRoute,
  routes as fictionRoutes,
  redirectedRoutes as redirectedFictionRoutes,
} from './fiction';
import {
  route as gamesRoute,
  routes as gamesRoutes,
  redirectedRoutes as redirectedGamesRoutes,
} from './games';
import {
  categoryRoutes as miscCategoryRoutes,
  route as miscRoute,
  routes as miscRoutes,
  redirectedRoutes as redirectedMiscRoutes,
} from './misc';
import {
  route as webRoute,
  routes as webRoutes,
  redirectedRoutes as redirectedWebRoutes,
} from './web';

export const homeRoute = {
  name: 'home',
  link: 'Home',
  path: '/',
  navExact: true,
  title: homeMeta.title,
  styles: homeMeta.styles,
  loadContent: () => (props) => <Home {...props} />,
};

export const booksRoute = {
  name: 'books',
  path: '/books',
  loadContent: () => (props) => <Books {...props} />,
};

export const redirectedRoutes = [
  {
    path: '/about',
    to: homeRoute.path,
  },
  ...redirectedFictionRoutes,
  ...redirectedGamesRoutes,
  ...redirectedMiscRoutes,
  ...redirectedWebRoutes,
];

export const topRoutes = [
  homeRoute,
  gamesRoute,
  webRoute,
  miscRoute,
  fictionRoute,
];

export default [
  ...topRoutes,
  ...fictionCategoryRoutes,
  ...fictionRoutes,
  ...gamesRoutes,
  ...miscCategoryRoutes,
  ...miscRoutes,
  ...webRoutes,
  booksRoute,
];
