// React
import React from 'react';
// Router
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
// Pages
import ConstituenciesPage from 'pages/Constituencies';
import RightsPage from 'pages/Rights';
// Styles
import { mixings } from 'styles';

// Navigation
function Navigation(props) {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <ConstituenciesPage style={mixings.fullFixedScreen} />
          )}
        />
        <Route
          path="/rights"
          component={RightsPage}
        />
      </Switch>
    </Router>
  );
}

export default Navigation;
