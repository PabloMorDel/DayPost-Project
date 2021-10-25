import { React, useState, useContext, useEffect } from 'react';
import { AuthContext, PostsContext } from '..';
import get from '../api/get';
import FeedPost from '../components/FeedPost';
import NavigationBar from '../components/NavigationBar';
import OutsideFooter from '../components/OutsideFooter';
import PostManager from '../components/PostManager';
import Searcher from '../components/Searcher';
import UserManager from '../components/UserManager';

function Home(props) {
  const [postList, setPostList] = useContext(PostsContext);
  const [token, setToken] = useContext(AuthContext);

  const { posts } = postList;
  console.log('posts', posts);
  return (
    <div className='mainHomePage'>
      <div className='navigator'>
        <NavigationBar></NavigationBar>
        <div className='userManager'>
          <UserManager></UserManager>
        </div>
      </div>
      <div className='mainContent'>
        <Searcher></Searcher>
        <div className='contentHeader'></div>
        <div className='postsNavBar'></div>
        <PostManager>
          {posts && posts.length > 0
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
            : 'No data'}
        </PostManager>
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
