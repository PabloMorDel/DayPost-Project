import MainTitle from './MainTitle';

function NavigationBar() {
    return (
        <header>
            <nav id='navigator'>
                <ul id='navigator-list'>
                    <li>
                        <a href='/'>
                            <MainTitle></MainTitle>
                        </a>
                    </li>
                    <li>
                        <img src='' alt='' />
                        <a href='/'>Home</a>
                    </li>
                    <li>
                        <img src='' alt='' />
                        <a href='/'>User profile</a>
                    </li>
                    <li>
                        <img src='' alt='' />
                        <a href='/'>Trends</a>
                    </li>
                    <li>
                        <button className='Create-button'>
                            ¡Create a Post!
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default NavigationBar;
