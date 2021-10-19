import get from '../api/get';
import FeedPost from './FeedPost';
import React, { useState } from 'react';

function PostManager(imgSource) {
  //get posts
  const [postList, setPostList] = useState([]);

  return (
    <div className='.postManager'>
      <div className='feed'>
        <FeedPost></FeedPost>
      </div>
    </div>
  );
}

export default PostManager;
