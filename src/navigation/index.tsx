import React, { FC } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import MapScreen from 'screens/MapScreen';
import RightsScreen from 'screens/RightsScreen';
import { NavPaths } from './types';

const Navigation: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={NavPaths.Map} component={MapScreen} />
        <Route path={NavPaths.Rights} component={RightsScreen} />
        <Redirect to={NavPaths.Rights}/>
      </Switch>
    </Router>
  );
};

export default Navigation;
