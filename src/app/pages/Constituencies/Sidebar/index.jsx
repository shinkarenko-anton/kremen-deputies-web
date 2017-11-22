// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import InfoBlock from './infoBlock';
import AuthBlock from './authBlock';
import AdminBlock from './adminBlock';

// Prop types

const propTypes = {
  user: PropTypes.object,
  userRole: PropTypes.string,
};

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
      <AuthBlock
        onGoBackClick={e => this.onGoBackClick(e)}
      />
    ) : (
      <InfoBlock
        onLoginClick={e => this.onLoginClick(e)}
      />
    );

    return (
      <div style={{ height: '100%' }}>
        {user ? (
          <AdminBlock
            user={user}
            userRole={this.props.userRole}
          />
        ) : (notAuthContent)}
      </div>
    );
  }
}

// Attach prop types

ConstituenciesSidebar.propTypes = propTypes;
ConstituenciesSidebar.defaultProps = defaultProps;

export default ConstituenciesSidebar;
