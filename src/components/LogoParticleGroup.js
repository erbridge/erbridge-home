import PropTypes from 'prop-types';
import React, { Component } from 'react';

import LogoParticle from './LogoParticle';

// Magic numbers derived from the source svg.
// FIXME: Refactor the offset values into the parent, instead.
const PARTICLE_OFFSET_X = 266.1;
const PARTICLE_OFFSET_Y = 41.2;
const PARTICLE_RADIUS = 12;
const PARTICLE_DIAMETER = 2 * PARTICLE_RADIUS;
const PARTICLE_SEPARATION = 10.3;
const HEXAGON_RADIUS_RATIO = 3 / (2 * Math.sqrt(3));

class LogoParticleGroup extends Component {
  static propTypes = {
    focused: PropTypes.bool,
    pointerPosition: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    viewBox: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
  };

  state = {
    boundingRect: null,
    scale: 1,
    translate: 0,
  };

  saveBoundingRect = () => {
    if (!this.node) {
      return;
    }

    this.setState({ boundingRect: this.node.getBoundingClientRect() });
  };

  animateFocus() {
    this.cancelFocus();

    const duration = 250;
    const endTime = Date.now() + duration;

    const runAnimation = () => {
      const now = Date.now();

      // Linear to match the text fade.
      const t = Math.min(1, 1 - (endTime - now) / duration);

      this.updateFocus(t);

      if (t === 1) {
        return;
      }

      this.focusAnimFrame = window.requestAnimationFrame(() => {
        runAnimation();
      });
    };

    runAnimation();
  }

  updateFocus(t = 1) {
    const { focused } = this.props;
    const { scale, translate } = this.state;

    // FIXME: Derive this from the viewBox height.
    const scaleTarget = focused ? 1.59 : 1;

    // FIXME: Derive this from the particle group width (in svg space).
    const translateTarget = focused ? -47 : 0;

    // Use the current state's value as the start to match css transitions.
    this.setState({
      scale: scale + (scaleTarget - scale) * t,
      translate: translate + (translateTarget - translate) * t,
    });
  }

  cancelFocus() {
    if (this.focusAnimFrame) {
      window.cancelAnimationFrame(this.focusAnimFrame);
    }
  }

  componentDidMount() {
    this.saveBoundingRect();
    window.addEventListener('resize', this.saveBoundingRect);

    this.updateFocus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.focused !== prevProps.focused) {
      this.animateFocus();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.saveBoundingRect);

    this.cancelFocus();
  }

  render() {
    const { pointerPosition, viewBox } = this.props;
    const { boundingRect, scale, translate } = this.state;

    return (
      <g
        ref={node => {
          this.node = node;
        }}
        className="LogoParticleGroup"
        transform={[
          `translate(${viewBox.width})`,
          `scale(${scale})`,
          `translate(${-viewBox.width + translate})`,
        ].join(' ')}
      >
        {[Array(3), Array(4), Array(5), Array(4), Array(3)].map((arr, i) =>
          arr
            .fill(1)
            .map((_, j) => ({
              x:
                PARTICLE_OFFSET_X +
                (i - 1) *
                  (PARTICLE_DIAMETER + PARTICLE_SEPARATION) *
                  HEXAGON_RADIUS_RATIO,
              y:
                PARTICLE_OFFSET_Y -
                PARTICLE_RADIUS +
                (j + 0.5 * (4 - arr.length)) *
                  (PARTICLE_DIAMETER + PARTICLE_SEPARATION),
            }))
            .map(({ x, y }, j) => (
              <LogoParticle
                key={100 * i + j}
                groupBoundingRect={boundingRect}
                pointerPosition={pointerPosition}
                radius={PARTICLE_RADIUS}
                x={x}
                y={y}
              />
            )),
        )}
      </g>
    );
  }
}

export default LogoParticleGroup;
