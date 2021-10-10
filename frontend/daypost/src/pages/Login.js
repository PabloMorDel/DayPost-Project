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
      setToken(body.accessToken);
      window.alert('Welcome!');
    };
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
          <LoginForm
            submitHandler={submitLoginHandler}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            email={email}
            password={password}
          />
        </div>
        <Utils />
      </div>
      <OutsideFooter />
    </div>
  );
}
//app.post('/users/login', loginUser);
export default Login;
