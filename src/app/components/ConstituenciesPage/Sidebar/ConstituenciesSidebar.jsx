// React
import React from 'react';
import PropTypes from 'prop-types';
// Elements
import ConstituenciesInfo from './ConstituenciesInfo';
import ConstituenciesAuth from './ConstituenciesAuth';
import ConstituenciesAdmin from './ConstituenciesAdmin';

// PropTypes
const propTypes = {
  user: PropTypes.object,
  userRole: PropTypes.string,
};

// DefaultProps
const defaultProps = {
  user: null,
  userRole: null,
};

// ConstituenciesSidebar
class ConstituenciesSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAuth: false,
    };
  }

  // Events

  onLoginClick(e) {
    e.stopPropagation();
    this.setState({ showAuth: true });
  }

  onGoBackClick(e) {
    e.stopPropagation();
    this.setState({ showAuth: false });
  }

  // Render

  render() {
    const user = this.props.user;

    const notAuthContent = this.state.showAuth ? (
      <ConstituenciesAuth
        onGoBackClick={e => this.onGoBackClick(e)}
      />
    ) : (
      <ConstituenciesInfo
        onLoginClick={e => this.onLoginClick(e)}
      />
    );

    return (
      <div style={{ height: '100%' }}>
        {user ? (
          <ConstituenciesAdmin
            user={user}
            userRole={this.props.userRole}
          />
        ) : (notAuthContent)}
      </div>
    );
  }
}

ConstituenciesSidebar.propTypes = propTypes;
ConstituenciesSidebar.defaultProps = defaultProps;

export default ConstituenciesSidebar;
