import { shallow } from 'enzyme';
import React from 'react';

import routes, { redirectedRoutes } from '../routes';

import Body from './Body';

jest.mock('../pages/fiction');
jest.mock('../pages/games');
jest.mock('../pages/home.mdx', () => ({ meta: {}, default: () => 'home.mdx' }));
jest.mock('../pages/misc');
jest.mock('../pages/web');

it('renders correctly with all props', () => {
  expect(
    shallow(
      <Body
        className="Test__body"
        routes={routes}
        redirectedRoutes={redirectedRoutes}
      />,
    ),
  ).toMatchSnapshot();
});

it('renders correctly without optional props', () => {
  expect(
    shallow(<Body className="Test__body" routes={routes} />),
  ).toMatchSnapshot();
});
