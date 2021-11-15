import { useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import putSmth from '../api/putSmth';
import { AuthContext, StatusContext } from '..';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import putImg from '../api/putImg';
import getUser from '../api/getUser';

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
  const [currentUser, setCurrentUser] = useLocalStorage({}, 'currentUser');
  const [userId] = useLocalStorage('', 'userID');
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [newAccName, setNewAccName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState();
  const [portraitFile, setPortraitFile] = useState();
  const { waiting, setWaiting } = useContext(StatusContext);

  useEffect(() => {
    const urlUser = `http://localhost:4001/users/${userId}`;

    getUser({
      url: urlUser,
      token,
      onSuccess: (body) => {
        setCurrentUser(body.message);
      },
    });
  }, [waiting]);

  const handleModalOpen = () => {
    setOpenSettingsModal(true);
  };
  const handleModalClose = () => {
    setOpenSettingsModal(false);
  };
  const onEditBioSubmit = (e) => {
    e.preventDefault();
    setWaiting(true);
    const url = `http://localhost:4001/users/biography/${userId}`;
    putSmth({
      url,
      info: { biography: newBio },
      token,
      onSuccess: (body) => {
        currentUser.biography = body.biography;
        setWaiting(false);
        console.log('funciona?', body);
      },
    });
  };
  const onEditAccNameSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:4001/users/accName/${userId}`;
    setWaiting(true);
    putSmth({
      url,
      info: { accName: newAccName },
      token,
      onSuccess: (body) => {
        currentUser.accName = body.accName;
        setWaiting(false);
        console.log('funciona?2', body);
      },
    });
  };
  const onEditEmailSubmit = (e) => {
    e.preventDefault();
    setWaiting(true);
    const url = `http://localhost:4001/users/email/${userId}`;
    putSmth({
      url,
      info: { email: newEmail },
      token,
      onSuccess: (body) => {
        currentUser.email = body.email;
        setWaiting(false);
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
    //HAY QUE PASARLE LA PASS ACTUAL AL BODY // ENCRIPTAMIENTO>?????//
  };
  const onEditAvatarSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:4001/users/avatar/${userId}`;
    setWaiting(true);
    putImg({
      url,
      file: avatarFile,
      fileType: 'avatar',
      token,
      onSucess: (body) => {
        console.log(body);
        setWaiting(false);
        setAvatarFile(body.filename);
        currentUser.avatar = body.filename;
        console.log(avatarFile);
      },
    });
  };
  const onEditPortraitSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:4001/users/portrait/${userId}`;
    setWaiting(true);
    const onSuccess = (body) => {
      console.log('hola?');
      console.log(body);
      setPortraitFile(body.filename);
      setWaiting(false);
      console.log(portraitFile);
    };
    putImg({
      url,
      file: portraitFile,
      fileType: 'portrait',
      token,
      onSuccess,
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
          <p className='userAccName'>{currentUser.accName}</p>
          <p className='userUserName'>{`@${currentUser.userName}`}</p>
          <p className='userBiography'>{currentUser.biography}</p>
        </div>
      </div>
      <div className='accountSettings'>
        <button className='icon icon-cogs' onClick={handleModalOpen}>
          Edit
        </button>
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
              <Avatar
                alt='avatarImg'
                src={avatarPath}
                sx={{ width: 80, height: 80 }}
              ></Avatar>
            </div>
            <div className='imgInputs' style={{ display: 'flex' }}>
              <div
                className='avatarSettings'
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <form onSubmit={onEditAvatarSubmit}>
                  <input
                    type='file'
                    id='portraitChange'
                    onChange={(e) => {
                      setAvatarFile(e.target.files[0]);
                      console.log(avatarFile);
                    }}
                  />

                  <Button type='submit'>Change Avatar</Button>
                </form>
              </div>

              <div className='editPortraitSettings'>
                <form onSubmit={onEditPortraitSubmit}>
                  <input
                    type='file'
                    id='portraitChange'
                    onChange={(e) => {
                      setPortraitFile(e.target.files[0]);
                      console.log(portraitFile);
                    }}
                  />

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
