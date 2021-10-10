import { React } from 'react';

function Home(props) {
  return (
    <div>
      <div className='navigator'></div>
      <div className='userManager'></div>
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
        <footer className='privacy'></footer>
      </div>
    </div>
  );
}
export default Home;
