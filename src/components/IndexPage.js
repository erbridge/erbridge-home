import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import assets from '../assets';

import './IndexPage.css';

class IndexPage extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  render() {
    const { routes } = this.props;

    return (
      <div className="IndexPage">
        <div className="IndexPage__content">
          {routes.map((route, index) => {
            const image = assets[route.image] || route.image;

            return (
              <Link
                key={route.name || index}
                className="IndexPage__link"
                to={route.path}
              >
                {image && (
                  <div
                    className="IndexPage__link__image"
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                  />
                )}
                <div className="IndexPage__link__content">
                  <div className="IndexPage__link__text">{route.title}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default IndexPage;
