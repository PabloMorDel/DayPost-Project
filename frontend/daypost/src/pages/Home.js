import { React, useState, useContext, useEffect } from 'react';
import { AuthContext, StatusContext } from '..';
import { useParams } from 'react-router';

import FeedPost from '../components/FeedPost';
import NavigationBar from '../components/NavigationBar';
import OutsideFooter from '../components/OutsideFooter';
import PostManager from '../components/PostManager';
import Searcher from '../components/Searcher';
import UserManager from '../components/UserManager';
import getPost from '../api/getPost';
import { PostCategories } from '../components/PostsCategories';
import { Link } from '@mui/material';
import CreatePost from '../components/CreatePost';

function Home(props) {
  const { topic } = useParams();
  const [token] = useContext(AuthContext);
  const { setWaiting, setError } = useContext(StatusContext);
  const [posts, setPosts] = useState([]);

  const unParsedCurrentUser = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(unParsedCurrentUser);

  //const [category, setCategory] = useState(null);

  useEffect(() => {
    const url = `http://localhost:4001/posts/${topic ? '?topic=' + topic : ''}`;

    setWaiting(true);

    getPost({
      url,
      token,
      onSuccess: (body) => {
        console.log('bodyGet', body);
        setWaiting(false);
        setPosts(body.posts);
      },
      onError: (error) => {
        setWaiting(false);
        setError(error);
      },
    });
  }, [token, setError, setWaiting, topic]);

  return (
    <div className='mainHomePage'>
      <div className='navigator'>
        {/* <<<<<<< HEAD */}
        <NavigationBar
          avatar={currentUser.avatar}
          userName={currentUser.userName}
        />
      </div>
      <div className='userManager'>
        <UserManager />
      </div>
      <div className='mainContent'>
        <Searcher />
        <CreatePost></CreatePost>
        <div className='contentHeader'></div>
        <div className='postsNavBar'>
          <PostCategories />
        </div>
        <PostManager>
          {posts.length > 0
            ? posts.map((post) => {
                return (
                  <FeedPost
                    key={post.id}
                    id={post.id}
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
export default Home;
