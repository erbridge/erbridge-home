import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';

import './LogoParticle.scss';

class LogoParticle extends Component {
  static propTypes = {
    groupBoundingRect: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
    }),
    pointerPosition: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    radius: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.containerRef = createRef();
  }

  // TODO: Smooth the rotation a little to make very fast movement less janky.
  getRotation() {
    const { groupBoundingRect, pointerPosition } = this.props;

    if (!groupBoundingRect && !pointerPosition) {
      return 0;
    }

    if (!this.containerRef.current) {
      return 0;
    }

    const {
      x,
      y,
      width,
      height,
    } = this.containerRef.current.getBoundingClientRect();

    const midPointPosition = { x: x + width / 2, y: y + height / 2 };

    let pointerX = 0;
    let pointerY = 0;

    if (pointerPosition) {
      pointerX = pointerPosition.x || 0;
      pointerY = pointerPosition.y || 0;
    } else {
      // Magic numbers estimated from the source svg.
      pointerX = (((groupBoundingRect.right || 0) + 15) * width) / 7.2;
      pointerY = (((groupBoundingRect.top || 0) + 5) * height) / 7.2;
    }

    return (
      (Math.atan2(
        pointerY - midPointPosition.y,
        pointerX - midPointPosition.x,
      ) *
        180) /
      Math.PI
    );
  }

  render() {
    const { radius, x, y } = this.props;
    const rotation = this.getRotation();
    const diameter = 2 * radius;

    return (
      <g
        ref={this.containerRef}
        className="LogoParticle"
        transform={`rotate(${rotation}, ${x}, ${y})`}
      >
        <path
          className="LogoParticle__top-semicircle"
          d={`M${x},${y - radius} a1,1 0 0,0 0,${diameter}`}
        />
        <path
          className="LogoParticle__bottom-semicircle"
          d={`M${x},${y + radius} a1,1 0 0,0 0,${-diameter}`}
        />
      </g>
    );
  }
}

export default LogoParticle;
