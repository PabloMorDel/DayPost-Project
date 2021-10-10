import React from 'react';

function RegisterForm() {
  return (
    <div>
      <form action=''>
        <label htmlFor='userData'>
          <input type='text' />
        </label>
        <label htmlFor='userName'>
          <input type='text' />
        </label>
        <label htmlFor='email'>
          <input type='text' />
        </label>
        <label htmlFor='password'>
          <input type='password' />
        </label>
        <label htmlFor='repeatPassword'>
          <input type='password' />
        </label>
        <button type='submit'>Register!</button>
      </form>
    </div>
  );
}
export default RegisterForm;
