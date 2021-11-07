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

function Home(props) {
<<<<<<< HEAD
  const { topic } = useParams();
  const [token] = useContext(AuthContext);
  const { setWaiting, setError } = useContext(StatusContext);
  const [posts, setPosts] = useState([]);

  const unParsedCurrentUser = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(unParsedCurrentUser);
  console.log(currentUser);

  //const [category, setCategory] = useState(null);
=======
    const { topic } = useParams();
    const [token] = useContext(AuthContext);
    const { setWaiting, setError } = useContext(StatusContext);
    const [posts, setPosts] = useState([]);
    //const [category, setCategory] = useState(null);
>>>>>>> 3bf0d7be148d664345a47d80ff777183ec58e943

    useEffect(() => {
        const url = `http://localhost:4001/posts/${
            topic ? '?topic=' + topic : ''
        }`;

        setWaiting(true);

        getPost({
            url,
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
    }, [token, setError, setWaiting, topic]);

<<<<<<< HEAD
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
=======
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
            <div className='mainContent'>
                <Searcher />
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
>>>>>>> 3bf0d7be148d664345a47d80ff777183ec58e943
}
export default Home;
