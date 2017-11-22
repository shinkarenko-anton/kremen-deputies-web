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

  onLoginClick = (e) => {
    e.stopPropagation();
    this.setState({ showAuth: true });
  }

  onGoBackClick = (e) => {
    e.stopPropagation();
    this.setState({ showAuth: false });
  }

  // Render

  render() {
    // Props
    const {
      style,
      user,
    } = this.props;

    const notAuthContent = this.state.showAuth ? (
      <AuthBlock
        onGoBackClick={this.onGoBackClick}
      />
    ) : (
      <InfoBlock
        onLoginClick={this.onLoginClick}
      />
    );

    return (
      <div style={[styles.container, style]}>
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

// Styles

const styles = {
  container: {
    height: '100%'
  },
}

// Attach prop types

ConstituenciesSidebar.propTypes = propTypes;
ConstituenciesSidebar.defaultProps = defaultProps;

export default ConstituenciesSidebar;
