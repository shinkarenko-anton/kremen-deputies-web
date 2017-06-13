// React
import React from 'react';
// UI
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// Log
import Log from '../../../shared/Services/Log';
const log = Log.withModule('DeputiesAuth');
// Firebase
import { auth, fbAuthProvider, googleAuthProvider } from '../../../shared/Firebase/Firebase';

// Style
const style = {
  row: {
    marginTop: 10,
  },
};

// DeputiesAuth
export default class DeputiesAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
    };
  }

    // Events

  onLoginWithEmailClick(e) {
    log('login with email click');
    auth.signInWithEmailAndPassword(this.state.email, this.state.pass).catch((err) => {
      if (err) return log.err(err);
    });
  }

  onLoginWithGoogleClick(e) {
    log('login with google click');
    auth.signInWithPopup(googleAuthProvider).then((result) => {
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
  }

  onLoginWithFacebookClick(e) {
    log('login with facebook click');
    auth.signInWithPopup(fbAuthProvider).then((result) => {
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
  }

    // Render

  render() {
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
            onClick={e => this.onLoginWithGoogleClick(e)}
          />
        </div>
        <div style={style.row}>
          <RaisedButton
            label="Facebook"
            labelStyle={{ color: '#ffffff' }}
            backgroundColor="#3b5998"
            icon={<i className="fa fa-facebook" style={{ color: '#ffffff' }} />}
            fullWidth
            onClick={e => this.onLoginWithFacebookClick(e)}
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
