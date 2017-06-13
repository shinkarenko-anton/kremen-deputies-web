// React
import React from 'react';
import PropTypes from 'prop-types';
// Utils
import _ from 'lodash';
// Assets
import vestnikLogo from '../../../assets/img/logo/vestnik-logo-300w.png';
import iqHubLogo from '../../../assets/img/logo/iqhub-logo-300w.png';
import googlePlayLogo from '../../../assets/img/logo/google-play-logo-vector.svg';

// PropTypes
const propTypes = {
  style: PropTypes.object,
};

// DefaultProps
const defaultProps = {
  style: {},
};

// Style
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const linkStyle = {
  borderBottom: 'none',
  cursor: 'pointer',
};

const imgStyle = {
  width: '100%',
};

// BrandsPanel
class BrandsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    // Render

  render() {
    return (
      <div style={_.assign({}, containerStyle, this.props.style)}>
        <div style={{ padding: '5px' }}>
          <a
            href="https://play.google.com/store/apps/details?id=constituencies.kremen.ua"
            target="__blank"
            style={linkStyle}
          >
            <img
              src={googlePlayLogo}
              style={imgStyle}
              alt="Карта виборчих округів Кременчука в Google Play"
            />
          </a>
        </div>
        <div style={{ padding: '5px' }}>
          <a
            href="http://io.kr.ua/"
            target="__blank"
            style={linkStyle}
          >
            <img
              src={iqHubLogo}
              style={imgStyle}
              alt="IQ Hub"
            />
          </a>
        </div>
        <div style={{ padding: '5px' }}>
          <a
            href="http://vestnik.in.ua/"
            target="__blank"
            style={linkStyle}
          >
            <img
              src={vestnikLogo}
              style={imgStyle}
              alt="Вісник Кременчука"
            />
          </a>
        </div>
      </div>
    );
  }
}

BrandsPanel.propTypes = propTypes;
BrandsPanel.defaultProps = defaultProps;

export default BrandsPanel;
