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
import { Avatar, requirePropFactory } from '@mui/material';
import { format } from 'date-fns';
import { post } from '../api/post';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { postComment } from '../api/postComment';
import getPostComments from '../api/getPostComments';
import React from 'react';

function SinglePost({
  idOwner,
  title,
  description,
  photo,
  source,
  date,
  likes,
  id,
  onCommentSubmit,
  onCommentChange,
  comment,
}) {
  const [token] = useContext(AuthContext);
  const [postOwner, setPostOwner] = useState({});
  const [like, setLike] = useState(false);

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
              <p>
                Source:
                <a href={source}>{source}</a>
                {}
              </p>
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
            <FavoriteIcon
              style={{ color: 'red', cursor: 'pointer' }}
            ></FavoriteIcon>
          ) : (
            <FavoriteIcon
              style={{ color: 'black', cursor: 'pointer' }}
            ></FavoriteIcon>
          )}
          <div>{likes}</div>
        </div>
        <div className='writeComment'>
          <form onSubmit={onCommentSubmit}>
            <label htmlFor='commentInput' onChange={onCommentChange}>
              <textarea
                id='commentInput'
                placeholder='Share your thoughts...'
                value={comment}
              ></textarea>
              <button type='submit'>Comment!</button>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
function Comment({ commentContent, idUser }) {
  const [token] = useContext(AuthContext);
  const [user, setUser] = useState({});
  useEffect(() => {
    const url = `http://localhost:4001/users/${idUser}`;
    setTimeout(() => {
      getUser({
        url,
        token,
        onSuccess: (body) => {
          console.log(body);
          setUser(body.message);
        },
      });
    }, 200);
  }, []);
  console.log('user', user.avatar);
  return (
    <div>
      <div>
        {user.accName ? (
          <React.Fragment>
            <img
              src={`http://localhost:3000/public/${user.avatar}`}
              alt='avatar'
            />
            <p>{user.accName}</p>
          </React.Fragment>
        ) : (
          'Loading'
        )}
      </div>
      <div>
        <p>{commentContent}</p>
      </div>
    </div>
  );
}
function Post() {
  const [token] = useContext(AuthContext);
  const { idPost } = useParams();
  const { setWaiting, setError } = useContext(StatusContext);
  const [post, setPost] = useState({});
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const unParsedCurrentUser = localStorage.getItem('currentUser');
  const parsedCurrentUser = JSON.parse(unParsedCurrentUser);
  // const [postOwner, setPostOwner] = useState({});
  console.log('idPost', idPost);
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
    getPostComments({
      url: `http://localhost:4001/posts/getComments/${idPost}`,
      token,
      onSuccess: (body) => {
        setWaiting(false);
        setCommentList(body.message);
      },
      onError: (error) => {
        setWaiting(false);
        setError(error);
      },
    });
  }, []);

  const onCommentSubmit = (e) => {
    console.log(idPost);
    e.preventDefault();
    const url = `http://localhost:4001/posts/comment/${idPost}`;
    console.log(url);
    postComment({
      url,
      body: { comment },
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      onSuccess: (body) => {
        console.log(body);
      },
    });
  };
  const onCommentChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };
  return (
    <div className='post-mainHomePage'>
      <div className='post-navigator'>
        <NavigationBar
          avatar={parsedCurrentUser.avatar}
          userName={parsedCurrentUser.userName}
        />
      </div>
      {/* <div className='userManager'>
                <UserManager />
            </div> */}
      <div className='post-mainContent'>
        <Searcher />
        <div className='post-contentHeader'></div>
        <div className='post-postsNavBar'>
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
            onCommentChange={onCommentChange}
            onCommentSubmit={onCommentSubmit}
            comment={comment}
          />
        ) : (
          'No Data'
        )}
      </div>
      {commentList.length > 1
        ? commentList.map((comm) => {
            console.log('commMap', comm.content);
            return (
              <Comment
                commentContent={comm.content}
                idUser={comm.idUser}
                key={comm.id}
              />
            );
          })
        : 'No one commented yet, be the first one!'}
      <div className='post-aside'>
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
