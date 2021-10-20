import get from '../api/get';
import FeedPost from './FeedPost';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '..';

function PostManager(imgSource) {
  //get posts
  const [postList, setPostList] = useState([]);
  const [token, setToken] = useContext(AuthContext);

  useEffect(() => {
    const url = 'http://localhost:4001/posts';

    const interval = setInterval(
      get(url, (body) => setPostList(body), token),
      10000000
    );
    return () => clearInterval(interval);
  }, [token]);
  console.log('postlist', postList);
  const { posts } = postList;
  console.log(posts);
  return (
    <div className='.postManager'>
      <div className='feed'>
        {posts.map((post) => {
          return <div>{post.title}</div>;
        })}
      </div>
    </div>
  );
}

export default PostManager;
