import fictionPosts from '../pages/fiction';

import { generateRoutes } from './helpers';

export const {
  categoryRoutes,
  redirectedRoutes,
  route,
  routes,
} = generateRoutes('fiction', 'fiction', 'Fiction', 'Fiction', fictionPosts, {
  categories: [
    {
      name: 'all',
      path: 'all',
      link: 'All',
      title: 'All Fiction',
      routeFilter: Boolean,
    },
    {
      name: 'poetry',
      path: 'poetry',
      title: 'Poetry',
      routeFilter: ({ categories }) =>
        categories && categories.indexOf('poetry') !== -1,
    },
    {
      name: 'screenplays',
      path: 'screenplays',
      title: 'Screenplays',
      routeFilter: ({ categories }) =>
        categories && categories.indexOf('screenplay') !== -1,
    },
    {
      name: 'short-stories',
      path: 'short-stories',
      title: 'Short Stories',
      routeFilter: ({ categories }) =>
        categories && categories.indexOf('short-story') !== -1,
    },
    {
      name: 'generative',
      path: 'generative',
      link: 'Generative',
      title: 'Generative Fiction',
      routeFilter: ({ categories }) =>
        categories && categories.indexOf('generative') !== -1,
    },
    {
      name: 'uncategorized',
      path: 'uncategorized',
      link: 'Uncategorized',
      title: 'Uncategorized Fiction',
      routeFilter: ({ categories }) =>
        !categories ||
        (categories.indexOf('poetry') === -1 &&
          categories.indexOf('screenplay') === -1 &&
          categories.indexOf('short-story') === -1 &&
          categories.indexOf('generative') === -1),
    },
  ],
});
