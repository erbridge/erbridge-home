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
      link: 'All',
      title: 'All Misc Projects',
      routeFilter: Boolean,
    },
    {
      name: 'apps',
      path: 'apps',
      title: 'Apps',
      routeFilter: ({ categories }) =>
        categories && categories.indexOf('app') !== -1,
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
      link: 'Uncategorized',
      title: 'Uncategorized Misc Projects',
      routeFilter: ({ categories }) =>
        !categories ||
        (categories.indexOf('app') === -1 && categories.indexOf('bot') === -1),
    },
  ],
  extraRedirects: [
    {
      path: '/tools/gotwit',
      to: getRoutePath('misc', 'gotwit'),
    },
    {
      path: '/tools/iris',
      to: getRoutePath('misc', 'iris'),
    },
    {
      path: '/tools/itchy-electron',
      to: getRoutePath('misc', 'itchy-electron'),
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
