import { shallow } from 'enzyme';
import React from 'react';

import Body from './Body';

it('renders correctly', () => {
  expect(shallow(<Body />)).toMatchSnapshot();
});
