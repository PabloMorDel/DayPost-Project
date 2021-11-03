import * as React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '..';
import { Avatar, Link } from '@mui/material';

function CustomMenu(props) {
    //TODO ESTO ES UNA MIERDA

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
function UserMenu(props) {
    const [token, setToken] = React.useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        e.preventDefault();
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
                Options
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
                <MenuItem onClick={handleClose} disableRipple>
                    <Avatar />
                    <Link to='/account'> Profile</Link>
                </MenuItem>
                <MenuItem onClick={logOutOnClick} disableRipple>
                    <LogoutIcon />
                    Log Out
                </MenuItem>
            </CustomMenu>
        </div>
    );
}

export default UserMenu;
