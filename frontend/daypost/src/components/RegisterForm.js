import React, { useState } from 'react';
import { post } from '../api/post';

function RegisterForm() {
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
    <div>
      <form action='' onSubmit={registerSubmitHandler}>
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
  );
}
export default RegisterForm;
