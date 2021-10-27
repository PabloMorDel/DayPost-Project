import { useContext, useEffect, useState } from 'react';
import { AuthContext, StatusContext, UserIdContext } from '..';
import getUser from '../api/getUser';
import AccountCard from '../components/AccountCard';
import NavigationBar from '../components/NavigationBar';
import OutsideFooter from '../components/OutsideFooter';
import PostManager from '../components/PostManager';
import Searcher from '../components/Searcher';
import UserManager from '../components/UserManager';
import useLocalStorage from '../hooks/useLocalStorage';

function Account() {
  const [loggedUser] = useLocalStorage({}, 'loggedUser');
  const [token] = useContext(AuthContext);
  const [loggedUserId] = useContext(UserIdContext);
  const [currentUser, setCurrentUser] = useLocalStorage({}, 'currentUser');
  // const { setWaiting, setError } = useContext(StatusContext);
  useEffect(() => {
    const url = `http://localhost:4001/users/${loggedUserId}`;

    getUser({
      url,
      token,
      onSuccess: (body) => {
        setCurrentUser(body.message);
      },
    });
  }, []);
  console.log(currentUser);

  return (
    <div className='mainHomePage'>
      <div className='navigator'>
        {/* <<<<<<< HEAD */}
        <NavigationBar />
      </div>
      <div className='userManager'>
        <UserManager />
        {/* ======= */}
        <div className='userManager'>
          <UserManager></UserManager>
        </div>
        {/* >>>>>>> dervys */}
      </div>
      <div className='accountPageSearcher'>
        <Searcher />
      </div>
      <div className='mainContent'>
        <AccountCard />
        <PostManager>
          {/* {posts.length > 0
          ? posts.map((post) => {
              return (
                <FeedPost
                  key={post.id}
                  topic={post.topic}
                  title={post.title}
                  likes={post.likes}
                ></FeedPost>
              );
            })
          : 'No data'} */}
        </PostManager>
      </div>
      <div className='aside'>
        <div className='spotlightAccs'></div>
        <div className='FAQ'></div>
        <footer className='privacy'>
          <OutsideFooter />
        </footer>
      </div>
    </div>
  );
}

export default Account;
