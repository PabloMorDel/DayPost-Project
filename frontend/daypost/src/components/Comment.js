import { Avatar } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '..';
import getUser from '../api/getUser';

function Comment({ commentContent, idUser }) {
  const [token] = useContext(AuthContext);
  const [user, setUser] = useState();
  useEffect(() => {
    console.log(idUser);
    const url = `http://localhost:4001/users/${idUser}`;
    getUser({
      url,
      token,
      onSuccess: (body) => {
        console.log(body);
        setUser(body.message);
      },
    });
  }, []);
  console.log(user);
  return (
    <>
      <div>
        <Avatar src={user.avatar} />
        <p>{user.accName}</p>
      </div>
      <div>
        <p>{commentContent}</p>
      </div>
    </>
  );
}

export default Comment;
