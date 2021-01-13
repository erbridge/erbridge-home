import { shallow } from 'enzyme';
import React from 'react';

import App from './App';

jest.mock('./pages/fiction');
jest.mock('./pages/games');
jest.mock('./pages/home.mdx', () => ({ meta: {}, default: () => 'home.mdx' }));
jest.mock('./pages/misc');
jest.mock('./pages/web');

it('renders correctly', () => {
  expect(shallow(<App />)).toMatchSnapshot();
});
