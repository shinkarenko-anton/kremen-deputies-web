// React
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// UI
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
// Firebase
import { auth } from 'services/firebase';
// Redux
import { actions } from 'store';
// Configs
import { CONFIG_KEYS } from 'services/configStorage';
// Log
import Log from 'utils/log';
const log = Log.withModule('DeputieAdmin');

// PropTypes
const propTypes = {
  configs: PropTypes.object,
  user: PropTypes.object,
  userRole: PropTypes.string,

  onConfigsChange: PropTypes.func.isRequired,
};

// DefaultProps
const defaultProps = {
  configs: {},
  user: null,
  userRole: null,
};

// Redux
const mapStateToProps = state => ({
  configs: state.configs,
});

const mapDispatchToProps = dispatch => ({
  onConfigsChange: (name, val) => dispatch(actions.configs.change(name, val)),
});

// Style
const style = {
  row: {
    marginTop: 10,
  },
};

// DeputieAdmin
class DeputieAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Events

  onEditModeToggle(e, val) {
    e.stopPropagation();
    this.props.onConfigsChange(CONFIG_KEYS.EDIT_MODE, val);
  }

  // Render

  render() {
    const user = this.props.user;
    if (!user) return null;

    const onLogoutClick = (e) => {
      e.stopPropagation();
      log('logout click');
      auth.signOut().then(() => {
        log('user logouted');
      }).catch((err) => {
        log.err(err);
      });
    };

    const isAdmin = this.props.userRole === 'admin';

    return (
      <div>
        <div>
          <h3>{user.displayName}</h3>
        </div>
        {isAdmin ? (
          <div>
            <div style={style.row}>
              <Toggle
                label="Режим редагування"
                toggled={this.props.configs[CONFIG_KEYS.EDIT_MODE]}
                onToggle={(e, val) => this.onEditModeToggle(e, val)}
              />
            </div>
          </div>
                ) : null}
        <div style={style.row}>
          <RaisedButton
            label="Вийти"
            primary
            fullWidth
            onClick={e => onLogoutClick(e)}
          />
        </div>
      </div>
    );
  }
}

// Attach prop types

DeputieAdmin.propTypes = propTypes;
DeputieAdmin.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(DeputieAdmin);
