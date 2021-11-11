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
                            <button
                                className='home-button icon icon-home3'
                                onClick={homeButtonOnClick}
                            >
                                Home
                            </button>
                        </Link>
                    </li>
                    <li className='trends-li'>
                        <img src='' alt='' />
                        <a className='trends-button icon icon-power' href='/'>
                            Trends
                        </a>
                    </li>
                    <li>
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
        </header>
    );
}
export default NavigationBar;
