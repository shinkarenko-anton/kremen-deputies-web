import { ThemeProvider } from '@material-ui/styles';
import React, { Component } from 'react';
import { muiTheme } from 'styles';

export default class App extends Component {
  public render() {
    return (
      <ThemeProvider theme={muiTheme}>
        <div>Hello</div>
      </ThemeProvider>
    );
  }
}
