import React from 'react';
import MainTitle from '../components/MainTitle';
import OutsideFooter from '../components/OutsideFooter';
import RegisterForm from '../components/RegisterForm';
import Utils from '../components/Utils';

//Usar materialUI titles? div.text

function Register(pros) {
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
          <RegisterForm />
        </div>
        <Utils />
      </div>
      <OutsideFooter />
    </div>
  );
}
export default Register;
