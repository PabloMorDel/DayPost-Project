import { useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import putSmth from '../api/putSmth';
import { AuthContext } from '..';
import Avatar from '@mui/material/Avatar';
import { Button, IconButton, Input } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import putImg from '../api/putImg';

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function AccountCard() {
  const [token] = useContext(AuthContext);
  const [currentUser] = useLocalStorage({}, 'currentUser');
  const [userId] = useLocalStorage('', 'userID');
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [newAccName, setNewAccName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState({});
  const [portraitFile, setPortraitFile] = useState({});
  const handleModalOpen = () => {
    setOpenSettingsModal(true);
  };
  const handleModalClose = () => {
    setOpenSettingsModal(false);
  };
  const onEditBioSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:4001/users/biography/${userId}`;
    putSmth({
      url,
      info: { biography: newBio },
      token,
      onSuccess: (body) => {
        currentUser.biography = body.biography;
        console.log('funciona?', body);
      },
    });
  };
  const onEditAccNameSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:4001/users/accName/${userId}`;
    putSmth({
      url,
      info: { accName: newAccName },
      token,
      onSuccess: (body) => {
        currentUser.accName = body.accName;
        console.log('funciona?2', body);
      },
    });
  };
  const onEditEmailSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:4001/users/email/${userId}`;
    putSmth({
      url,
      info: { email: newEmail },
      token,
      onSuccess: (body) => {
        currentUser.email = body.email;
        console.log('funciona el email?', body);
      },
    });
  };
  const onEditPasswordSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:4001/users/password/${userId}`;
    putSmth({
      url,
      info: { currentPass: currentPassword, newPass: newPassword },
      token,
      onSucess: (body) => {
        console.log(('funciona la password?', body));
      },
    });
    //HAY QUE PASARLE LA PASS ACTUAL AL BODY // ENCRIPTAMIENTO>?????
  };
  const onEditAvatarSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:4001/users/avatar/${userId}`;
    putImg({
      url,
      file: avatarFile,
      fileType: 'avatar',
      token,
      onSucess: (body) => {
        console.log(body);
        setAvatarFile(body.filename);
        console.log(avatarFile);
      },
    });
  };
  const onEditPortraitSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:4001/users/portrait/${userId}`;
    putImg({
      url,
      file: portraitFile,
      fileType: 'portrait',
      token,
      onSucess: (body) => {
        console.log('hola?');
        console.log(body);
        setPortraitFile(body.filename);
        console.log(portraitFile);
      },
    });
  };

  let avatarPath = currentUser.avatar
    ? currentUser.avatar
    : 'https://i.pravatar.cc/150?img=8';
  let portraitPath = currentUser.portrait
    ? currentUser.portrait
    : 'defaultBG.jpeg';

  return (
    <div className='accountCard'>
      <div className='accountInfo'>
        <div className='editableAccountInfo'>
          <div
            className='bgPortrait'
            style={{ backgroundImage: `url(${portraitPath})` }}
          >
            <Avatar
              alt='avatarImg'
              src={avatarPath}
              sx={{ width: 80, height: 80 }}
            />
          </div>
          <p>
            <strong>{currentUser.accName}</strong>
          </p>
          <p>{`@${currentUser.userName}`}</p>
          <p>{currentUser.biography}</p>
        </div>

        <div className='socialAccountInfo'>
          <span>Followers</span>
          <span>Followed</span>
        </div>
      </div>
      <div className='accountSettings'>
        <button onClick={handleModalOpen}>Account Settings</button>
        <Modal
          open={openSettingsModal}
          onClose={handleModalClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={modalBoxStyle}>
            <div
              className='settings-modal-images'
              style={{
                backgroundImage: `url(${portraitPath})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                className='avatarSettings'
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <Avatar
                  alt='avatarImg'
                  src={avatarPath}
                  sx={{ width: 80, height: 80 }}
                ></Avatar>
                <form onSubmit={onEditAvatarSubmit}>
                  <input
                    accept='image/*'
                    // className={classes.input}
                    id='icon-button-file'
                    type='file'
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      setAvatarFile(e.target.files[0]);
                      console.log(avatarFile);
                    }}
                  />
                  <label htmlFor='icon-button-file'>
                    <IconButton
                      color='primary'
                      // className={classes.button}
                      component='span'
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <Button type='submit'>Change Avatar</Button>
                </form>
              </div>
              <div
                className='portraitSettings'
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <form onSubmit={onEditPortraitSubmit}>
                  <input
                    accept='image/*'
                    // className={classes.input}
                    id='icon-button-file'
                    type='file'
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      setPortraitFile(e.target.files[0]);
                      console.log(portraitFile);
                    }}
                  />
                  <label htmlFor='icon-button-file'>
                    <IconButton
                      color='primary'
                      // className={classes.button}
                      component='span'
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <Button type='submit'>Change Portrait</Button>
                </form>
              </div>
            </div>
            <div className='settings-modal-form-container'>
              <form className='settings-modal-form' onSubmit={onEditBioSubmit}>
                <p>Edit Biography</p>
                <input
                  type='text'
                  className='settings-modal-input'
                  placeholder={currentUser.biography}
                  onChange={(e) => setNewBio(e.target.value)}
                />
              </form>
              <form
                className='settings-modal-form'
                onSubmit={onEditAccNameSubmit}
              >
                <p>Edit Account Name</p>
                <input
                  type='text'
                  className='settings-modal-input'
                  placeholder={currentUser.accName}
                  onChange={(e) => setNewAccName(e.target.value)}
                />
              </form>
              <form
                className='settings-modal-form'
                onSubmit={onEditEmailSubmit}
              >
                <p>Edit Email</p>
                <input
                  type='email'
                  className='settings-modal-input'
                  placeholder={currentUser.email}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </form>
              <form
                className='settings-modal-form'
                onSubmit={onEditPasswordSubmit}
              >
                <p>Edit Password</p>

                <p>Type your current password</p>
                <input
                  type='password'
                  className='settings-modal-input'
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <p>Type your new password</p>
                <input
                  type='password'
                  className='settings-modal-input'
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type='submit'>Submit changes</button>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AccountCard;

// {/* <form onSubmit={onEditAvatarSubmit}>
//                 <label
//                   htmlFor='icon-button-file'
//                   onChange={(e) => {
//                     console.log(e.target.files[0]);
//                     setAvatarFile(e.target.files[0]);
//                     console.log(avatarFile);
//                   }}
//                 >
//                   <div
//                     className='avatarLabelStyle'
//                     style={{ display: 'flex', flexDirection: 'column' }}
//                   >
//                     <IconButton
//                       color='primary'
//                       aria-label='upload picture'
//                       component='span'
//                       type='submit'
//                     >
//                       <Input
//                         key='1'
//                         accept='image/*'
//                         id='icon-button-file'
//                         type='file'
//                         style={{
//                           display: 'none',
//                           backgroundImage: `url(${portraitPath})`,
//                           border: '1px solid #ccc',
//                           padding: '6px 12p',
//                           cursor: 'pointer',
//                         }}
//                       />
//                       <PhotoCamera
//                         style={{
//                           position: 'relative',
//                           color: 'rebeccapurple',
//                           bottom: '80%',
//                           left: '80%',
//                           zIndex: 1,
//                         }}
//                       />
//                       <Avatar
//                         alt='avatarImg'
//                         src={avatarPath}
//                         sx={{ width: 80, height: 80 }}
//                       ></Avatar>
//                     </IconButton>
//                     <Button type='submit' style={{ color: 'rebeccapurple' }}>
//                       Submit Avatar Change
//                     </Button>
//                   </div>
//                 </label>
//               </form> */}
//               <div class='image-upload'>
//                 <form onSubmit={onEditAvatarSubmit}>
//                   <label htmlFor='file-input'>
//                     <img
//                       src={portraitPath}
//                       alt='portraitImg'
//                       style={{ width: 80, height: 80 }}
//                     />
//                   </label>

//                   <input
//                     id='file-input'
//                     type='file'
//                     onChange={(e) => {
//                       setAvatarFile(e.target.files[0]);
//                     }}
//                   />
//                   <button type='submit'>submit avatar</button>
//                 </form>
//               </div>
//               <form onSubmit={onEditPortraitSubmit}>
//                 <label htmlFor='icon-button-file'>
//                   <div>
//                     <IconButton
//                       color='primary'
//                       aria-label='upload picture'
//                       component='span'
//                       type='submit'
//                     >
//                       <Input
//                         key='2'
//                         accept='image/*'
//                         id='icon-button-file'
//                         type='file'
//                         style={{
//                           display: 'none',
//                           padding: '6px 12p',
//                           cursor: 'pointer',
//                         }}
//                         onChange={(e) => {
//                           console.log(e.target.files);
//                           setPortraitFile(e.target.files[0]);
//                           console.log(portraitFile);
//                         }}
//                       />
//                       <PhotoCamera
//                         style={{
//                           position: 'relative',
//                           color: 'rebeccapurple',
//                           bottom: '80%',
//                           left: '80%',
//                           zIndex: 1,
//                         }}
//                       />
//                     </IconButton>
//                     <Button type='submit' style={{ color: 'rebeccapurple' }}>
//                       Submit Portrait Change
//                     </Button>
//                   </div>
//                 </label>
//               </form>
