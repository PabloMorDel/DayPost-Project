import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='flex'>
        <div className='aside'>
          <Title />
        </div>
        <div className='main'>
          <div className='text'>
            <h1>Economy, Politics, Cryptocurrencies, Sports, Actuality</h1>
            <h2>Login into Daypost!</h2>
          </div>
          <div className='formContainer'>
            <RegisteredLogin />
            <BasicButton />
          </div>
          <div className='utils'>
            <p>
              <a
                href='http://google.es/search'
                target='_blank'
                rel='noreferrer'
              >
                Forgot your password?
              </a>
            </p>
            <p>
              <a
                href='http://google.es/search'
                target='_blank'
                rel='noreferrer'
              >
                Register in DayPost!
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className='bottom'>
        <footer>
          <p>About us</p>
          <p>FAQ</p>
          <p>© 2021 DayPost S.A 😎</p>
        </footer>
      </div>
    </div>
  );
}

function BasicButton(props) {
  return (
    <div>
      <button>Log in!</button>
    </div>
  );
}
function Title(props) {
  return (
    <div className='asideContent'>
      <p className='logo'>DayPost</p>
      <p>explore investigate uncensored</p>
    </div>
  );
}
function RegisteredLogin(props) {
  return (
    <div className='forms'>
      <input type='text' value='email' />
      <input type='text' value='password' />
    </div>
  );
}
export default App;
