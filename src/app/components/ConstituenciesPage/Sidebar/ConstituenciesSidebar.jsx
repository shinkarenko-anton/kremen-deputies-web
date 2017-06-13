// React
import React from 'react';
// Elements
import ConstituenciesInfo from './ConstituenciesInfo';
import ConstituenciesAuth from './ConstituenciesAuth';
import ConstituenciesAdmin from './ConstituenciesAdmin';

// ConstituenciesSidebar
export default class ConstituenciesSidebar extends React.Component {
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
    return (
      <div style={{ height: '100%' }}>
        {user ? (
          <ConstituenciesAdmin
            user={user}
            userRole={this.props.userRole}
          />
                ) : (
                    this.state.showAuth ? (
                      <ConstituenciesAuth
                        onGoBackClick={e => this.onGoBackClick(e)}
                      />
                    ) : (
                      <ConstituenciesInfo
                        onLoginClick={e => this.onLoginClick(e)}
                      />
                    )
                )}
      </div>
    );
  }
}
