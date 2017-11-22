// React
import React from 'react';
import PropTypes from 'prop-types';
// UI
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// Firebase
import { auth, fbAuthProvider, googleAuthProvider } from 'services/firebase';
// Log
import Log from 'utils/log';
const log = Log.withModule('DeputiesAuth');

// PropTypes
const propTypes = {
  onGoBackClick: PropTypes.func.isRequired,
};

// DefaultProps
const defaultProps = {

};

// Style
const style = {
  row: {
    marginTop: 10,
  },
};

// DeputiesAuth
class DeputiesAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
    };
  }

  // Events

  onLoginWithEmailClick() {
    log('login with email click');
    auth.signInWithEmailAndPassword(this.state.email, this.state.pass).catch((err) => {
      if (err) log.err(err);
    });
  }

  // Render

  render() {
    const onLoginWithGoogleClick = () => {
      log('login with google click');
      auth.signInWithPopup(googleAuthProvider).then(() => {
        // let token = result.credential.accessToken;
        // let user = result.user;
      }).catch((err) => {
        log.err(err);
        alert('Сталась помилка під час авторизації...');
        // let errorCode = err.code;
        // let errorMessage = err.message;
        // let email = err.email;
        // let credential = err.credential;
      });
    };

    const onLoginWithFacebookClick = () => {
      log('login with facebook click');
      auth.signInWithPopup(fbAuthProvider).then(() => {
        // let token = result.credential.accessToken;
        // let user = result.user;
      }).catch((err) => {
        log.err(err);
        alert('Сталась помилка під час авторизації...');
        // let errorCode = err.code;
        // let errorMessage = err.message;
        // let email = err.email;
        // let credential = err.credential;
      });
    };

    return (
      <div>
        <div><h3>Вхід</h3></div>
        <div>
          <TextField
            hintText="some@gmail.com"
            fullWidth
            value={this.state.email}
            onChange={(e, val) => { e.stopPropagation(); this.setState({ email: val }); }}
            floatingLabelText="Email"
          />
        </div>
        <div>
          <TextField
            hintText="****"
            floatingLabelText="Пароль"
            fullWidth
            value={this.state.pass}
            onChange={(e, val) => { e.stopPropagation(); this.setState({ pass: val }); }}
            type="password"
          />
        </div>
        <div style={style.row}>
          <RaisedButton
            label="Увійти"
            primary
            fullWidth
            onClick={e => this.onLoginWithEmailClick(e)}
          />
        </div>
        <div style={style.row}>
          <RaisedButton
            label="Google"
            labelStyle={{ color: '#ffffff' }}
            backgroundColor="#dd4b39"
            icon={<i className="fa fa-google" style={{ color: '#ffffff' }} />}
            fullWidth
            onClick={e => onLoginWithGoogleClick(e)}
          />
        </div>
        <div style={style.row}>
          <RaisedButton
            label="Facebook"
            labelStyle={{ color: '#ffffff' }}
            backgroundColor="#3b5998"
            icon={<i className="fa fa-facebook" style={{ color: '#ffffff' }} />}
            fullWidth
            onClick={e => onLoginWithFacebookClick(e)}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <FlatButton
            label="Назад"
            onClick={e => this.props.onGoBackClick(e)}
          />
        </div>
      </div>
    );
  }
}

DeputiesAuth.propTypes = propTypes;
DeputiesAuth.defaultProps = defaultProps;

export default DeputiesAuth;
