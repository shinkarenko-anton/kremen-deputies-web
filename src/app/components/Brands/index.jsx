// Utils
import _ from 'lodash';
// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Styles
import Radium from 'radium';

// Assets

import vestnikLogo from 'assets/img/logo/vestnik-logo-300w.png';
import iqHubLogo from 'assets/img/logo/iqhub-logo-300w.png';
import googlePlayLogo from 'assets/img/logo/google-play-logo-vector.svg';

// PropTypes

const propTypes = {
  style: PropTypes.object,
};

const defaultProps = {
  style: {},
};

// Brands

class Brands extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Render

  render() {
    // Props
    const {
      style,
    } = this.props;
    // Render
    return (
      <div style={[styles.container, style]}>
        <div style={styles.item}>
          <a
            href="https://play.google.com/store/apps/details?id=constituencies.kremen.ua"
            target="__blank"
            style={styles.link}
          >
            <img
              src={googlePlayLogo}
              style={styles.img}
              alt="Карта виборчих округів Кременчука в Google Play"
            />
          </a>
        </div>
        <div style={styles.item}>
          <a
            href="http://io.kr.ua/"
            target="__blank"
            style={styles.link}
          >
            <img
              src={iqHubLogo}
              style={styles.img}
              alt="IQ Hub"
            />
          </a>
        </div>
        <div style={styles.item}>
          <a
            href="http://vestnik.in.ua/"
            target="__blank"
            style={styles.link}
          >
            <img
              src={vestnikLogo}
              style={styles.img}
              alt="Вісник Кременчука"
            />
          </a>
        </div>
      </div>
    );
  }
}

// Styles

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: { 
    padding: '5px',
  },
  link: {
    borderBottom: 'none',
    cursor: 'pointer',
  },
  img: {
    width: '100%',
  },
};

// Attach prop types

Brands.propTypes = propTypes;
Brands.defaultProps = defaultProps;

export default Radium(Brands);
