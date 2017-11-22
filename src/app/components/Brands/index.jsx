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
    // Data
    const items = [
      {icon: iqHubLogo, title: "IQ Hub", link: "https://io.kr.ua/"},
      {icon: vestnikLogo, title: "Вісник Кременчука", link: "https://vestnik.in.ua/"},
      {icon: googlePlayLogo, title: "Карта виборчих округів Кременчука в Google Play", link: "https://play.google.com/store/apps/details?id=constituencies.kremen.ua"},
    ];
    // Render
    return (
      <div style={[styles.container, style]}>
        {_.map(items, ({icon, title, link}, index) => (
          <div 
            key={index}
            style={styles.item}
          >
            <a
              href={link}
              target="__blank"
              style={styles.link}
            >
              <img
                src={icon}
                style={styles.img}
                alt={title}
              />
            </a>
          </div>
        ))}
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
    width: 100,
  },
};

// Attach prop types

Brands.propTypes = propTypes;
Brands.defaultProps = defaultProps;

export default Radium(Brands);
