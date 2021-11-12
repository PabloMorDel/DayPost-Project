// import { useContext } from 'react';
// import { AuthContext } from '..';
import { Avatar } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, StatusContext } from '..';
import getPost from '../api/getPost';
import getUser from '../api/getUser';

function FeaturedAccounts({ postArray }) {
  const [token] = useContext(AuthContext);
  const [bestProfiles, setBestProfiles] = useState([]);
  let profiles = [];
  let successfulPostArray = postArray.splice(0, 4);

  for (const post of successfulPostArray) {
    getUser({
      url: `http://localhost:4001/users/${post.idUser}`,
      token,
      onSuccess: (body) => {
        let bbody = {};
        bbody = body.message;
        profiles.push(bbody);
      },
    });
  }

  useEffect(() => {
    setBestProfiles();
  }, []);
  console.log('profiles', profiles, typeof profiles);
  console.log('log', bestProfiles);
  return (
    <div>
      <div>
        <h3>Highlighted Accounts</h3>
      </div>
      <div>
        {/* {bestProfiles.map((profile) => {
          return (
            <li>
              <div>
                <Avatar src={profile.avatar} />
                <div>
                  <span>{profile.accName}</span>
                  <span>@{profile.userName}</span>
                </div>
              </div>
            </li>
          );
        })} */}
      </div>
    </div>
  );
}

export default FeaturedAccounts;
