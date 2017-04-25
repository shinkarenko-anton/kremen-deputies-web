// React
import React from 'react';
// Theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// Colors
import {
  cyan700,
  grey700,
  orange500,
  pinkA100, pinkA200, pinkA400,
  fullWhite,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

// Custom theme
let customTheme = {
  palette: {
    primary1Color: orange500,
    primary2Color: orange500,
    primary3Color: orange500,
    accent1Color: grey700,
    accent2Color: grey700,
    accent3Color: grey700,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
};

export default (props) => (
    <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
        {props.children}
    </MuiThemeProvider>
)