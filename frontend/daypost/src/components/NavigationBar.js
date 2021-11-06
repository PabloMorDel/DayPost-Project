import { Link } from 'react-router-dom';
import MainTitle from './MainTitle';
import UserMenu from './UserMenu';

function NavigationBar({ avatar, userName }) {
  return (
    <header>
      <nav id='navigator'>
        <ul id='navigator-list'>
          <li>
            <Link to='/home'>
              <MainTitle />
            </Link>
          </li>
          <li>
            <Link to='/home'>
              <button>Home</button>
            </Link>
          </li>
          <li>
            <UserMenu avatar={avatar} userName={userName} />
          </li>
          <li>
            <img src='' alt='' />
            <a href='/'>Trends</a>
          </li>
          <li>
            <button className='Create-button'>¡Create a Post!</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default NavigationBar;
