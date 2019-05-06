import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css'
import Movies from './Movies/Movies';
import FullMovie from './Movies/FullMovie/FullMovie';
import Search from './Movies/Search/Search';
import Navigation from './Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      {/* 

      <header>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                exact
                activeClassName="my-active"
                activeStyle={{
                  color: '#fa923f',
                  textDecoration: 'underline'
                }}>Movies</NavLink>
            </li>
            <li>
              <NavLink to={{
                pathname: '/search'
              }}>Search</NavLink>
            </li>
          </ul>
        </nav>
      </header> */}
      <Switch>
        <Route path='/search' exact component={Search} />
        <Route path='/:id' exact component={FullMovie} />
        <Route path='/' exact component={Movies} />
      </Switch>
    </div>
  );
}

export default App;
