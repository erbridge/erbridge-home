import blogPosts from '../pages/blog';

import {
  formatDate,
  generateRoutes,
  getRoutePath,
  sanitizePathComponent,
} from './helpers';

export const {
  categoryRoutes,
  redirectedRoutes,
  route,
  routes,
} = generateRoutes('blog', 'blog', 'Blog', 'Blog', blogPosts, {
  categories: [
    {
      name: 'all',
      path: 'all',
      link: 'All',
      title: 'All Posts',
      routeFilter: route => route,
    },
    {
      name: 'gamedev',
      path: 'gamedev',
      link: 'Game Development',
      title: 'Game Development Posts',
      routeFilter: ({ categories }) =>
        categories && categories.indexOf('gamedev') !== -1,
    },
    {
      name: 'journals',
      path: 'journals',
      link: 'Roleplaying Journals',
      title: 'Roleplaying Journals',
      routeFilter: ({ categories }) =>
        categories &&
        categories.indexOf('roleplaying') !== -1 &&
        categories.indexOf('journal') !== -1,
    },
    {
      name: 'uncategorized',
      path: 'uncategorized',
      link: 'Uncategorized',
      title: 'Uncategorized Posts',
      routeFilter: ({ categories }) =>
        !categories ||
        (categories.indexOf('gamedev') === -1 &&
          categories.indexOf('roleplaying') === -1 &&
          categories.indexOf('journal') === -1),
    },
  ],
  extraRedirects: [
    {
      path: '/blog/skald',
      to: getRoutePath('blog'),
    },
  ],
  generateRedirects: posts =>
    posts
      .map(post => ({ ...post, date: formatDate(post.date, 'yyyy/MM/dd') }))
      .filter(({ date }) => date)
      .map(({ date, oldSlug, slug, title }) => ({
        path: `/blog/${date}/${sanitizePathComponent(
          oldSlug || slug || title,
        )}`,
        to: getRoutePath('blog', slug, title),
      })),
});
