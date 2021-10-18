import React, { useState } from 'react';
import { post } from '../api/post';
import MainTitle from '../components/MainTitle';
import OutsideFooter from '../components/OutsideFooter';
import RegisterForm from '../components/RegisterForm';
import Utils from '../components/Utils';

//Usar materialUI titles? div.text

function Register(pros) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [accName, setAccName] = useState('');
  const [userName, setUserName] = useState('');

  function registerSubmitHandler(e) {
    e.preventDefault();
    const registerUserInfo = {
      email,
      password,
      userName,
    };
    const url = 'http://localhost:4001/users';
    const onSuccess = (body) => {
      console.log(body);
      window.alert(
        'Registered user! Check your email to validate your account'
      );
    };
    post(
      url,
      registerUserInfo,
      { 'Content-Type': 'application/json' },
      onSuccess
    );
  }
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
          <div>
            <form onSubmit={registerSubmitHandler}>
              <label htmlFor='userData'>
                <input
                  type='text'
                  value={accName}
                  onChange={(e) => {
                    setAccName(e.target.value);
                  }}
                />
              </label>
              <label htmlFor='userName'>
                <input
                  type='text'
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </label>
              <label htmlFor='email'>
                <input
                  type='text'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
              <label htmlFor='password'>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
              <label htmlFor='repeatPassword'>
                <input
                  type='password'
                  value={repeatPassword}
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                  }}
                />
              </label>
              <button type='submit'>Register!</button>
            </form>
          </div>
        </div>
        <Utils />
      </div>
      <OutsideFooter />
    </div>
  );
}
export default Register;
