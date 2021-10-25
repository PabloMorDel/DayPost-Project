import get from '../api/get';
import FeedPost from './FeedPost';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '..';

//se supone que sera el componente que regule el feed de las publicaciones

function PostManager(props) {
  //get posts
  return (
    <div className='.postManager'>
      {props.children}
      {/* LA IDEA ES QUE CADA MAP DEVUELVA UN FEEDPOST */}
    </div>
  );
}
// {posts.length > 0
//   ? posts.map((post) => {
//       return (
//         <FeedPost
//           key={post.id}
//           topic={post.topic}
//           title={post.title}
//           likes={post.likes}
//         ></FeedPost>
//       );
//     })
//   : 'No data'}
export default PostManager;
