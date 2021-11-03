import { useContext, useEffect, useState } from 'react';
import { AuthContext, StatusContext } from '..';
import { useParams } from 'react-router';
import NavigationBar from '../components/NavigationBar';
import OutsideFooter from '../components/OutsideFooter';
import { PostCategories } from '../components/PostsCategories';
import Searcher from '../components/Searcher';
import UserManager from '../components/UserManager';
import getPost from '../api/getPost';
import getUser from '../api/getUser';
import { Avatar } from '@mui/material';
import { format } from 'date-fns';
import { post } from '../api/post';
import FavoriteIcon from '@mui/icons-material/Favorite';

function SinglePost({
  idOwner,
  title,
  description,
  photo,
  source,
  date,
  likes,
  id,
}) {
  const [token] = useContext(AuthContext);
  const [postOwner, setPostOwner] = useState({});
  const [like, setLike] = useState(false);
  console.log(postOwner);
  useEffect(() => {
    getUser({
      url: `http://localhost:4001/users/${idOwner}`,
      token,
      onSuccess: (body) => {
        setPostOwner(body.message);
      },
    });
  }, []);
  const formatDate = (date) => {
    let time = new Date(date);
    let formattedDate = format(time, 'mm-dd-yyyy');
    return formattedDate;
  };
  const onLikeButtonClick = (e) => {
    const url = `http://localhost:4001/posts/like/${id}`;
    e.preventDefault();
    const onSuccess = () => {
      setLike(true);
    };
    post(
      url,
      {},
      { Authorization: token, 'Content-type': 'application/json' },
      onSuccess
    );
  };
  console.log(like);
  return (
    <div className='singlePost'>
      <div className='fullUserInfo'>
        <Avatar
          alt='userOwnerAvatar'
          src={postOwner.avatar}
          sx={{ width: 80, height: 80 }}
        />
        <div className='userNames'>
          <div>
            <p>
              <strong>{postOwner.userAcc}</strong>
            </p>
          </div>
          <div>
            <p>@{postOwner.userName}</p>
          </div>
        </div>
        <div className='postInfo'>
          <div className='postText'>
            <div>
              <p>{source}</p>
              <p>
                Created:
                {formatDate(date)}
              </p>
            </div>
            <div>
              <p>{title}</p>
            </div>
            <div>
              <p>{description}</p>
            </div>
          </div>
          <div className='postImg'></div>
        </div>
        <div className='likesANDcomments' onClick={onLikeButtonClick}>
          {like ? (
            <FavoriteIcon style={{ color: 'red' }}></FavoriteIcon>
          ) : (
            <FavoriteIcon style={{ color: 'black' }}></FavoriteIcon>
          )}
          <div>{likes}</div>
        </div>
      </div>
    </div>
  );
}

function Post() {
  const [token] = useContext(AuthContext);
  const { idPost } = useParams();
  const { setWaiting, setError } = useContext(StatusContext);
  const [post, setPost] = useState({});
  // const [postOwner, setPostOwner] = useState({});

  useEffect(() => {
    const urlPost = `http://localhost:4001/posts/${idPost}`;
    getPost({
      url: urlPost,
      token,
      onSuccess: (body) => {
        setWaiting(false);
        setPost(body.message);
      },
      onError: (error) => {
        setWaiting(false);
        setError(error);
      },
    });
  }, []);

  console.log(post);

  return (
    <div className='mainHomePage'>
      <div className='navigator'>
        <NavigationBar />
      </div>
      <div className='userManager'>
        <UserManager />

        <div className='userManager'>
          <UserManager></UserManager>
        </div>
      </div>
      <div className='mainContent'>
        <Searcher />
        <div className='contentHeader'></div>
        <div className='postsNavBar'>
          <PostCategories />
        </div>
        {post.idUser ? (
          <SinglePost
            idOwner={post.idUser}
            source={post.source}
            description={post.description}
            title={post.title}
            date={post.createdAt}
            id={idPost}
            likes={post.likes}
          />
        ) : (
          'No Data'
        )}
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
}

export default Post;