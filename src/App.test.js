import { shallow } from 'enzyme';
import React from 'react';

import App from './App';

it('renders correctly', () => {
  expect(shallow(<App />)).toMatchSnapshot();
});
