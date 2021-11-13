import { useContext, useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import getPost from '../api/getPost';
import getUser from '../api/getUser';
import { AuthContext } from '..';

function PostCardChanger({ postArray }) {
  const [showPost, setShowPost] = useState([]);
  const [postNumber, setPostNumber] = useState(0);
  const [token] = useContext(AuthContext);
  const length = 4;

  useEffect(() => {
    getPost({
      url: 'http://localhost:4001/posts',
      token,
      onSuccess: (body) => {
        console.log('bodyGet', body);

        setShowPost(body.posts.splice(0, 4));
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  }, []);
  console.log(showPost);

  const nextPost = () => {
    setPostNumber(postNumber === length - 1 ? 0 : postNumber + 1);
  };
  console.log(postNumber);
  const previousPost = () => {
    setPostNumber(postNumber === 0 ? length - 1 : postNumber - 1);
  };

  return (
    <div className='carrusel'>
      <ArrowBackIosNewIcon onClick={previousPost} />
      <ArrowForwardIosIcon onClick={nextPost} />
      {showPost[0]
        ? showPost.map((slide, index) => {
            return (
              <div
                className={index === postNumber ? 'active-slide' : 'slide'}
                key={index}
              >
                {index === postNumber && (
                  <img
                    src={
                      slide.photo
                        ? `${slide.photo}`
                        : 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
                    }
                    alt='slideImg'
                  />
                )}
              </div>
            );
          })
        : 'Loading'}
    </div>
  );
}

export default PostCardChanger;
