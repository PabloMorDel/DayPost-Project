import { Button, Link } from '@mui/material';
import { useHistory } from 'react-router-dom';

function FeedPost({ imgSource, topic, title, likes, id }) {
    const history = useHistory();
    const routeChanger = () => {
        const path = `/posts/${id}`;
        history.push(path);
    };
    return (
        <article
            className='post'
            onClick={routeChanger}
            style={{ cursor: 'pointer' }}
        >
            <header>
                <p>{topic}</p>
                <h1>{title}</h1>
            </header>

            <div className='post-image'>
                <img src={'/image-post-1.jpg'} alt='PostImage' />
            </div>
            <footer>
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
            </footer>
        </article>
    );
}

export default FeedPost;
