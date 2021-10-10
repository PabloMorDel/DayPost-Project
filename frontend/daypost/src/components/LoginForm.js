function LoginForm({
  submitHandler,
  onEmailChange,
  onPasswordChange,
  email,
  password,
}) {
  return (
    <div className='forms'>
      <form onSubmit={submitHandler}>
        <label htmlFor=''>
          <input type='email' value={email} onChange={onEmailChange} />
        </label>
        <label htmlFor=''>
          <input type='password' value={password} onChange={onPasswordChange} />
        </label>
        <button>Log In!</button>
      </form>
    </div>
  );
}

export default LoginForm;
