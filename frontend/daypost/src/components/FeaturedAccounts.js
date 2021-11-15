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

  // useEffect(() => {
  //   const posts = postArray;
  //   let profiles = [];
  //   if (posts.length > 0) {
  //     for (let i = 0; i < 4; i++) {
  //       getUser({
  //         url: `http://localhost:4001/users/${posts[i].idUser}`,
  //         token,
  //         onSuccess: (body) => {
  //           console.log(body);
  //           profiles.push(body.message);
  //         },
  //       });
  //     }
  //     setBestProfiles(profiles);
  //   }
  // }, [postArray]);
  // console.log(bestProfiles, 'bestProfiles');
  return (
    <div>
      <div>
        <h3>Highlighted Accounts</h3>
      </div>
      <div>
        {bestProfiles.length > 0
          ? bestProfiles.map((profile) => {
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
            })
          : 'Loading Data'}
      </div>
    </div>
  );
}

export default FeaturedAccounts;
