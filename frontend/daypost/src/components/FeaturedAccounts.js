// import { useContext } from 'react';
// import { AuthContext } from '..';
import { Avatar } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '..';
import getPost from '../api/getPost';
import getUser from '../api/getUser';

function FeaturedAccounts({ postArray }) {
  const [token] = useContext(AuthContext);
  const [gotProfiles, setGotProfiles] = useState(false);
  const bestProfiles = [];

  if (postArray.length > 1) {
    for (let i = 0; i < 4; i++) {
      const url = `http://localhost:4001/users/${postArray[i].idUser}`;
      getUser({
        url,
        onSuccess: (body) => {
          bestProfiles.push(body.message);
        },
        token,
      });
    }
  }
  const wtf = bestProfiles.map((prof) => {
    return prof.accName;
  });
  console.log(bestProfiles);
  console.log(wtf);

  return (
    <div>
      <div>
        <h3>Highlighted Accounts</h3>
      </div>
      <div>
        {bestProfiles.map((profile) => {
          return (
            <li key={profile}>
              <div>
                <Avatar src={profile.avatar} />
                <div>
                  <span>{profile.accName}</span>
                  <span>@{profile.userName}</span>
                </div>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default FeaturedAccounts;
