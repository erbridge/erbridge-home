import { shallow } from 'enzyme';
import React from 'react';

import routes from '../routes';

import Head from './Head';

jest.mock('../pages/fiction');
jest.mock('../pages/games');
jest.mock('../pages/home.mdx', () => ({ meta: {}, default: () => 'home.mdx' }));
jest.mock('../pages/misc');
jest.mock('../pages/web');

it('renders correctly', () => {
  expect(shallow(<Head routes={routes} />)).toMatchSnapshot();
});
