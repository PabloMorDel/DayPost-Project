import './App.css';

import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from '.';
import { AppError, AppWaiting } from './components/Status';

function App() {
  const [token] = useContext(AuthContext);

  return (
    <Router>
      <AppError />
      <AppWaiting />
      <nav>
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </ul>
      </nav>
      <div className='App'>
        <Switch>
          <Route path='/login'>
            {token ? <Redirect to='/home' /> : <Login />}
          </Route>
          <Route path='/home/:topic?'>
            {!token ? <Redirect to='/login' /> : <Home />}
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
