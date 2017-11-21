// React
import React from 'react';
// Styles
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// Colors
import { fade } from 'material-ui/utils/colorManipulator';
import colors from './colors';

// Custom theme
const customTheme = {
  palette: {
    primary1Color: colors.blue,
    primary2Color: colors.blue,
    primary3Color: colors.blue,
    accent1Color: '#0060bd',
    accent2Color: '#0060bd',
    accent3Color: '#0060bd',
    textColor: '#000000',
    secondaryTextColor: '#ffffff',
    alternateTextColor: '#ffffff',
    canvasColor: '#FFFFFF',
    borderColor: fade('#000000', 0.3),
    disabledColor: fade('#000000', 0.3),
    pickerHeaderColor: fade('#000000', 0.12),
    clockCircleColor: fade('#000000', 0.12),
  },
};

/* eslint-disable react/prop-types */
export default props => (
  <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
    {props.children}
  </MuiThemeProvider>
);
/* eslint-enable react/prop-types */
