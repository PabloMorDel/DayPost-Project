import * as React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext } from '..';
import { Avatar } from '@mui/material';
import { useHistory } from 'react-router-dom';

function CustomMenu(props) {
  return (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  );
}
function UserMenu({ avatar, userName }) {
  const [token, setToken] = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const routeChanger = () => {
    const path = token ? `/account` : `/register`;
    history.push(path);
  };
  const loginRouteChanger = () => {
    const path = `/login`;
    history.push(path);
  };
  const registerRouteChanger = () => {
    const path = `/register`;
    history.push(path);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setAnchorEl(null);
  };
  const handleProfileButtonClick = (e) => {
    e.preventDefault();
    routeChanger();
    setAnchorEl(null);
  };

  const logOutOnClick = () => {
    setAnchorEl(null);
    setToken(null);
  };
  // console.log('Anchor', anchorEl);

  return (
    <div>
      <Button
        id='demo-customized-button'
        aria-controls='demo-customized-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {token ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={avatar} style={{ height: '40px', width: '40px' }} />
            {userName}
          </div>
        ) : (
          'Hello, stranger!'
        )}
      </Button>

      <CustomMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {token ? (
          <MenuItem onClick={handleProfileButtonClick} disableRipple>
            Account
          </MenuItem>
        ) : (
          <MenuItem onClick={registerRouteChanger} disableRipple>
            Register
          </MenuItem>
        )}
        {token ? (
          <MenuItem onClick={logOutOnClick} disableRipple>
            <LogoutIcon />
            Log Out
          </MenuItem>
        ) : (
          <MenuItem onClick={loginRouteChanger} disableRipple>
            <LoginIcon />
            Log In
          </MenuItem>
        )}
      </CustomMenu>
    </div>
  );
}

export default UserMenu;
