import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Login from "./components/Home/Login";
import './App.css';

function App() {

  return (
    <div className="App">
      <header>
        <div>
          {/* exact on NavLink will only allow the "/" to be matched */}
          <NavLink exact to="/" activeClassName="active">
            Home
            </NavLink>
          <NavLink to="/kill_map" activeClassName="active">
            Kill Map
            </NavLink>
          <NavLink to="/profile" activeClassName="active">
            Profile
            </NavLink>
        </div>
      </header>
  <Switch>
    {/* exact on Route will allow only the '/' to be matched */}
    <Route exact path='/' component={Login}/>
    <Route path='/kill_map' render={() => {
      return <div>KillMap Path</div>
    }}/>
    <Route path='/profile' render={() => {
      return <div>Profile Path</div>
    }}/>
    <Route path='*' render={() => {
      return <div>ZAP</div>
    }}/>
  </Switch>
    </div>
  );
}

export default App;
