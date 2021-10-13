import { React } from 'react';
import NavigationBar from '../components/NavigationBar';
import OutsideFooter from '../components/OutsideFooter';
import UserManager from '../components/UserManager';

function Home(props) {
    return (
        <div>
            <div className='navigator'>
                <NavigationBar></NavigationBar>
            </div>
            <div className='userManager'>
                <UserManager></UserManager>
            </div>
            <div className='mainContent'>
                <div className='searchArea'>
                    <label htmlFor=''>
                        <input placeholder='Search in DayPost' type='text' />
                    </label>
                    <button>Search</button>
                </div>
                <div className='contentHeader'></div>
                <div className='postsNavBar'></div>
                <div className='.postManager'>
                    <div className='feed'>
                        <div className='post'></div>
                    </div>
                </div>
            </div>
            <div className='aside'>
                <div className='spotlightAccs'></div>
                <div className='FAQ'></div>
                <footer className='privacy'>
                    <OutsideFooter></OutsideFooter>
                </footer>
            </div>
        </div>
    );
}
export default Home;
