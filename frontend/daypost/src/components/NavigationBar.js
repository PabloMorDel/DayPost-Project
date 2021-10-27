import { Link } from 'react-router-dom';
import MainTitle from './MainTitle';
import UserMenu from './UserMenu';

function NavigationBar() {
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
            <img src='' alt='' />
            <a href='/'>Home</a>
          </li>
          <li>
            <UserMenu></UserMenu>
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
