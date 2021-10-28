import { useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import putSmth from '../api/putSmth';
import { AuthContext } from '..';
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
  const [newPassword, setNewPassword] = useState('');
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
  // const onEditEmailSubmit = (e) => {
  //   e.preventDefault();
  //   const url = `http://localhost:4001/users/biography/${currentUser.id}`
  // };
  // const onEditPasswordSubmit = (e) => {
  //   e.preventDefault();
  //   const url = `http://localhost:4001/users/biography/${currentUser.id}`
  // };
  return (
    <div className='accountCard'>
      <div className='accountInfo'>
        <div className='editableAccountInfo'>
          <img
            src='https://i.pravatar.cc/150?img=3'
            alt='accountAvatar'
            className='accountAvatar'
          />
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
              <form action='' className='settings-modal-form'>
                <p>Edit Email</p>
                <input
                  type='email'
                  className='settings-modal-input'
                  placeholder={currentUser.email}
                />
              </form>
              <form action='' className='settings-modal-form'>
                <p>Edit Password</p>
                <input type='password' className='settings-modal-input' />
              </form>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AccountCard;
