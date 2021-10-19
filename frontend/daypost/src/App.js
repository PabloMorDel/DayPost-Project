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
import get from './api/get';
get();
function App() {
  const [token, setToken] = useContext(AuthContext);

  return (
    <Router>
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
            {token ? <Redirect to='/home' /> : <Login></Login>}
          </Route>
          <Route path='/home'>
            <Home />
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
