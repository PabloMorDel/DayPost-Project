import { React, useState, useContext, useEffect } from 'react';
import { AuthContext, StatusContext, UserIdContext } from '..';
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
import getUser from '../api/getUser';
import useLocalStorage from '../hooks/useLocalStorage';
import PostCardChanger from '../components/PostCardChanger';
import FeaturedAccounts from '../components/FeaturedAccounts';

function Home(props) {
  const { topic } = useParams();
  const [token] = useContext(AuthContext);
  const { setWaiting, setError } = useContext(StatusContext);
  const [posts, setPosts] = useState([]);
  const [ordererPosts, setOrderedPosts] = useState([]);
  const [loggedUserId] = useContext(UserIdContext);
  const [currentUser, setCurrentUser] = useLocalStorage({}, 'currentUser');
  const [creatingPost, setCreatingPost] = useState(false);

  //const [category, setCategory] = useState(null);

  useEffect(() => {
    const url = `http://localhost:4001/posts/${topic ? '?topic=' + topic : ''}`;

    setWaiting(true);
    getUser({
      url: `http://localhost:4001/users/${loggedUserId}`,
      token,
      onSuccess: (getBody) => {
        setCurrentUser(getBody.message);
      },
    });
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
  const unParsedCurrentUser = localStorage.getItem('currentUser');
  const parsedCurrentUser = JSON.parse(unParsedCurrentUser);
  function onTrendsClick(e) {
    e.preventDefault();
    getPost({
      url: `http://localhost:4001/posts?order=createdAt&direction=DESC`,
      token,
      onSuccess: (body) => {
        setOrderedPosts(body.posts);
      },
    });
    setPosts(ordererPosts);
  }
  return (
    <div className='home-mainHomePage'>
      <header className='home-navigator'>
        <NavigationBar
          avatar={parsedCurrentUser.avatar}
          userName={parsedCurrentUser.userName}
          createPostOnClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setCreatingPost(true);
          }}
          homeButtonOnClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setCreatingPost(false);
          }}
          onTrendsClick={onTrendsClick}
        />
      </header>
      <div className='home-mainContent'>
        <Searcher postArray={posts} />
        {creatingPost ? <CreatePost /> : <PostCardChanger postArray={posts} />}

        <div className='home-postsNavBar'>
          <PostCategories />
        </div>
        {/* <PostManager>
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
            <div className='home-aside'>
                <div className='aside-fixed'>
                    <div className='home-spotlightAccs'>
                        <FeaturedAccounts postArray={posts} />
                    </div>
                    <div className='home-FAQ'></div>
                    <footer className='home-footer'>
                        <OutsideFooter />
                    </footer>
                </div>
            </div>
        </div> */}
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
                    imgSource={post.photo}
                  ></FeedPost>
                );
              })
            : 'No data'}
        </PostManager>
      </div>
      <div className='home-aside'>
        {/* <div className='home-spotlightAccs'>
          <FeaturedAccounts postArray={posts} />
        </div> */}
        <div className='home-FAQ'></div>
        <footer className='home-footer'>
          <OutsideFooter />
        </footer>
      </div>
    </div>
  );
}
export default Home;
