import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import Search from './pages/Search';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Search} isLoggedIn={this.state.loggedin} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
