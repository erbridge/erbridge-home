import { shallow } from 'enzyme';
import React from 'react';

import MarkdownPage from './MarkdownPage';

// FIXME: Support testing some entries for `styles`.
it('renders correctly with all props', () => {
  expect(
    shallow(
      <MarkdownPage
        content={props => <div {...props}>content</div>}
        date="01 January 2019"
        image="/assets/test.jpg"
        links={[{ href: '/a', label: 'A' }, { href: '/b', label: 'B' }]}
        showHeadingImage
        styles={[]}
        subtitle="Test Subtitle"
        tags={[['Developer', 'Designer'], ['JavaScript', 'HTML']]}
        title="Test Title"
      />,
    ),
  ).toMatchSnapshot();
});

it('renders correctly without optional props', () => {
  expect(
    shallow(<MarkdownPage content={props => <div {...props}>content</div>} />),
  ).toMatchSnapshot();
});

// FIXME: Support testing some entries for `styles`.
it('renders correctly with empty links', () => {
  expect(
    shallow(
      <MarkdownPage
        content={props => <div {...props}>content</div>}
        date="01 January 2019"
        image="/assets/test.jpg"
        links={[]}
        showHeadingImage
        styles={[]}
        subtitle="Test Subtitle"
        tags={[['Developer', 'Designer'], ['JavaScript', 'HTML']]}
        title="Test Title"
      />,
    ),
  ).toMatchSnapshot();
});

it('renders correctly with empty styles', () => {
  expect(
    shallow(
      <MarkdownPage
        content={props => <div {...props}>content</div>}
        date="01 January 2019"
        image="/assets/test.jpg"
        links={[{ href: '/a', label: 'A' }, { href: '/b', label: 'B' }]}
        showHeadingImage
        styles={[]}
        subtitle="Test Subtitle"
        tags={[['Developer', 'Designer'], ['JavaScript', 'HTML']]}
        title="Test Title"
      />,
    ),
  ).toMatchSnapshot();
});

// FIXME: Support testing some entries for `styles`.
it('renders correctly with empty tags', () => {
  expect(
    shallow(
      <MarkdownPage
        content={props => <div {...props}>content</div>}
        date="01 January 2019"
        image="/assets/test.jpg"
        links={[{ href: '/a', label: 'A' }, { href: '/b', label: 'B' }]}
        showHeadingImage
        styles={[]}
        subtitle="Test Subtitle"
        tags={[]}
        title="Test Title"
      />,
    ),
  ).toMatchSnapshot();
});

// FIXME: Support testing some entries for `styles`.
it('renders correctly with empty tag groups', () => {
  expect(
    shallow(
      <MarkdownPage
        content={props => <div {...props}>content</div>}
        date="01 January 2019"
        image="/assets/test.jpg"
        links={[{ href: '/a', label: 'A' }, { href: '/b', label: 'B' }]}
        showHeadingImage
        styles={[]}
        subtitle="Test Subtitle"
        tags={[['Developer', 'Designer'], []]}
        title="Test Title"
      />,
    ),
  ).toMatchSnapshot();
});

// FIXME: Support testing some entries for `styles`.
it('renders correctly when not showing the heading image', () => {
  expect(
    shallow(
      <MarkdownPage
        content={props => <div {...props}>content</div>}
        date="01 January 2019"
        image="/assets/test.jpg"
        links={[{ href: '/a', label: 'A' }, { href: '/b', label: 'B' }]}
        styles={[]}
        subtitle="Test Subtitle"
        tags={[['Developer', 'Designer'], ['JavaScript', 'HTML']]}
        title="Test Title"
      />,
    ),
  ).toMatchSnapshot();
});
