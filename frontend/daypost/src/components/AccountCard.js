import useLocalStorage from '../hooks/useLocalStorage';

function AccountCard() {
  const [currentUser] = useLocalStorage({}, 'currentUser');
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
            <strong>{currentUser.name}</strong>
          </p>
          <p>{`@${currentUser.account}`}</p>
          <p>{currentUser.biography}</p>
        </div>

        <div className='socialAccountInfo'>
          <span>Followers</span>
          <span>Followed</span>
        </div>
      </div>
      <div className='accountSettings'>
        <ul>
          <li>Account Settings</li>
          <li>
            <button>Edit biography</button>
          </li>
          <li>
            <button>Edit email</button>
          </li>
          <li>
            <button>Edit account name</button>
          </li>
          <li>
            <button>Edit password</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AccountCard;
