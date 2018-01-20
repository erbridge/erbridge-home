import miscPosts from '../pages/misc';

import { generateRoutes, getRoutePath } from './helpers';

export const {
  categoryRoutes,
  redirectedRoutes,
  route,
  routes,
} = generateRoutes('misc', 'misc', 'Misc', 'Misc', miscPosts, {
  categories: [
    {
      name: 'all',
      path: 'all',
      title: 'All Projects',
      routeFilter: route => route,
    },
    {
      name: 'bots',
      path: 'bots',
      title: 'Bots',
      routeFilter: ({ categories }) =>
        categories && categories.indexOf('bot') !== -1,
    },
    {
      name: 'uncategorized',
      path: 'uncategorized',
      title: 'Uncategorized',
      routeFilter: ({ categories }) =>
        !categories || categories.indexOf('bot') === -1,
    },
  ],
  extraRedirects: [
    {
      path: '/tools/iris',
      to: getRoutePath('misc', 'iris'),
    },
    {
      path: '/tools/lime-text',
      to: getRoutePath('misc', 'limetext'),
    },
    {
      path: '/tools/nqr',
      to: getRoutePath('misc', 'nqr'),
    },
  ],
});
