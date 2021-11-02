import { useContext, useEffect, useState } from 'react';
import { AuthContext, StatusContext, UserIdContext } from '..';
import getPost from '../api/getPost';
import getUser from '../api/getUser';
import AccountCard from '../components/AccountCard';
import FeedPost from '../components/FeedPost';
import NavigationBar from '../components/NavigationBar';
import OutsideFooter from '../components/OutsideFooter';
import PostManager from '../components/PostManager';
import Searcher from '../components/Searcher';
import UserManager from '../components/UserManager';
import useLocalStorage from '../hooks/useLocalStorage';

function Account() {
  const [token] = useContext(AuthContext);
  const [loggedUserId] = useContext(UserIdContext);
  const [currentUser, setCurrentUser] = useLocalStorage({}, 'currentUser');
  const { setWaiting, setError } = useContext(StatusContext);
  const [posts, setPosts] = useState([]);
  // const { setWaiting, setError } = useContext(StatusContext);
  useEffect(() => {
    const urlUser = `http://localhost:4001/users/${loggedUserId}`;
    const urlPosts = `http://localhost:4001/posts`;

    getUser(
      {
        url: urlUser,
        token,
        onSuccess: (body) => {
          setCurrentUser(body.message);
        },
      },
      [setWaiting, setError]
    );
    getPost({
      url: urlPosts,
      token,
      onSuccess: (body) => {
        console.log(body);
        setWaiting(false);
        setPosts(body.posts);
      },
      onError: (error) => {
        setWaiting(false);
        setError(error);
      },
    });
  }, [loggedUserId, setCurrentUser, token, setError, setWaiting]);
  console.log(currentUser);
  // console.log(posts);

  const userPosts = posts.filter(
    (sameIdPost) => sameIdPost.idUser === loggedUserId
  );
  // console.log(userPosts);

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
          {userPosts.length > 0
            ? userPosts.map((post) => {
                return (
                  <FeedPost
                    key={post.id}
                    topic={post.topic}
                    title={post.title}
                    likes={post.likes}
                  ></FeedPost>
                );
              })
            : 'No data'}
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
