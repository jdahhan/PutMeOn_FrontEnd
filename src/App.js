import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './pages/Home/Home';
import Playlists from './pages/Playlists/Playlists';
import Users from './pages/Users/Users';
import Login from './pages/Login/Login';
import NewAccount from './pages/NewAccount/NewAccount';
import './App.css';

function App() {
  return (
    <div className="root">
      <div className="content">
        <Router>
          <Switch>
            <Route exact={true} path={'/'}>
              <Home />
            </Route>
            <Route exact={true} path={'/playlists'}>
              <Playlists />
            </Route>
            <Route exact={true} path={'/users'}>
              <Users />
            </Route>
            <Route exact={true} path={'/login'}>
              <Login />
            </Route>
            <Route exact={true} path={'/NewAccount'}>
              <NewAccount />
            </Route>

          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
