import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import GameSetUp from './components/GameSetUp/GameSetUp'
import PlaceBet from './components/PlaceBet/PlaceBet'
import MadTrucker from './components/MadTrucker/MadTrucker'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={GameSetUp} />
    <Route path="placeBet" component={PlaceBet} />
    <Route path="madRucker" component={MadTrucker} />
  </Route>
);
