import get from '../api/get';
import FeedPost from './FeedPost';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '..';

//se supone que sera el componente que regule el feed de las publicaciones

function PostManager(imgSource) {
  //get posts
  const [postList, setPostList] = useState([]);
  const [token, setToken] = useContext(AuthContext);

  useEffect(() => {
    const url = 'http://localhost:4001/posts';

    const interval = setInterval(
      get(url, (body) => setPostList(body), token),
      10000
    );
    return () => clearInterval(interval);
  }, []);
  console.log('postlist', postList);
  const { posts } = postList;
  console.log(posts);
  return (
    <div className='.postManager'>
      <div className='feed'>
        {/* posts.length > 0 ?  {posts.map((post) => {
          return <div>{post.title}</div>;
        }) : 'No data'} */}
        {/* LA IDEA ES QUE CADA MAP DEVUELVA UN FEEDPOST */}
      </div>
    </div>
  );
}

export default PostManager;
