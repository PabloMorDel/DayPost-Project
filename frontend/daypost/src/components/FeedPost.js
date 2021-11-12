import { Button, Link } from '@mui/material';
import { useHistory } from 'react-router-dom';

function FeedPost({ imgSource, topic, title, likes, id }) {
  const history = useHistory();
  const routeChanger = () => {
    const path = `/posts/${id}`;
    history.push(path);
  };
  return (
    <div className='post' onClick={routeChanger} style={{ cursor: 'pointer' }}>
      <div className='post-category'>
        <p>{topic}</p>
      </div>
      <div className='post-title'>
        <strong>{title}</strong>
      </div>
      <div className='post-image'>
        <img src={'/image-post-1.jpg'} alt='PostImage' />
      </div>
      <div className='post-like'>
        <span className='icon icon-heart'></span>
        {likes}
      </div>
      <div className='post-button'>
        <button
          className='see-post icon icon-eye-plus'
          onClick={routeChanger}
        ></button>
      </div>
    </div>
  );
}

export default FeedPost;
