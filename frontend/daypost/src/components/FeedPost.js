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
      <div>
        <button onClick={routeChanger}>See Post</button>
      </div>
      <div>
        <p>{topic}</p>
      </div>
      <div>
        <strong>{title}</strong>
      </div>
      <div>
        <img src={'/memeholder.jpg'} alt='PostImage' />
      </div>
      <div>{likes}</div>
    </div>
  );
}

export default FeedPost;
