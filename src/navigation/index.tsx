import React, { FC } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import DistrictsMapScreen from 'screens/DistrictsMap';
import RightsScreen from 'screens/Rights';
import { NavPaths } from './types';

const Navigation: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={NavPaths.Map} component={DistrictsMapScreen} />
        <Route path={NavPaths.Rights} component={RightsScreen} />
        <Redirect to={NavPaths.Rights}/>
      </Switch>
    </Router>
  );
};

export default Navigation;
