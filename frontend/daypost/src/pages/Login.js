import React, { useState, useEffect } from 'react';
import { post } from '../api/post';
import LoginForm from '../components/LoginForm';
import MainTitle from '../components/MainTitle';
import OutsideFooter from '../components/OutsideFooter';
import Utils from '../components/Utils';
import useLocalStorage from '../hooks/useLocalStorage';

function Login(props) {
  const [token, setToken] = useLocalStorage({}, 'token');
  const [loggedUser, setLoggedUser] = useLocalStorage({}, 'loggedUser');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function submitLoginHandler(e) {
    e.preventDefault();
    const userInfo = {
      email,
      password,
    };
    setLoggedUser(userInfo);
    console.log(loggedUser);
    const url = 'http://localhost:4001/users/login';
    const onSuccess = (body) => {
      setToken(body.token);
      console.log(body);
      window.alert('Welcome!');
    };
    // let headers= new Headers()
    post(url, userInfo, { 'Content-Type': 'application/json' }, onSuccess);
  }
  console.log('token', token);
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  console.log(email, password, loggedUser);
  return (
    <div className='flex'>
      <div className='aside'>
        <MainTitle />
      </div>
      <div className='main'>
        <div className='text'>
          <h1>Economy, Politics, Cryptocurrencies, Sports, Actuality</h1>
          <h2>Login into Daypost!</h2>
        </div>
        <div className='formContainer'>
          <div className='forms'>
            <form onSubmit={submitLoginHandler}>
              <label htmlFor=''>
                <input type='email' value={email} onChange={onEmailChange} />
              </label>
              <label htmlFor=''>
                <input
                  type='password'
                  value={password}
                  onChange={onPasswordChange}
                />
              </label>
              <button type='submit'>Log In!</button>
            </form>
          </div>
        </div>
        <Utils />
      </div>
      <OutsideFooter />
    </div>
  );
}
//app.post('/users/login', loginUser);
export default Login;
