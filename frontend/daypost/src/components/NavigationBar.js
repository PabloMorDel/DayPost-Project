import { Link } from 'react-router-dom';
import MainTitle from './MainTitle';
import UserMenu from './UserMenu';

function NavigationBar({
    avatar,
    userName,
    createPostOnClick,
    homeButtonOnClick,
}) {
    return (
        <nav id='navigator'>
            <a className='logo'>
                <Link to='/home'>
                    <MainTitle />
                </Link>
            </a>

            <ul id='navigator-list'>
                <li className='home-li'>
                    <Link to='/home'>
                        <button
                            className='home-button with-icon'
                            onClick={homeButtonOnClick}
                        >
                            <span className='icon icon-home3'></span>
                            Home
                        </button>
                    </Link>
                </li>
                <li className='trends-li'>
                    <img src='' alt='' />
                    <a className='trends-button with-icon' href='/'>
                        <span className='icon icon-power'></span>
                        <span>Trends</span>
                    </a>
                </li>
                <li className='post-li'>
                    <button
                        className='create-button'
                        onClick={createPostOnClick}
                    >
                        ¡Create a Post!
                    </button>
                </li>
                <li>
                    <UserMenu avatar={avatar} userName={userName} />
                </li>
            </ul>
        </nav>
    );
}
export default NavigationBar;
