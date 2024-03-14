import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)`
    background-color: #23395b!important;
`

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    padding: 6px 10px;
    &:hover{
        background-color: #2c4975ea;
        padding-bottom: 4px; // To avoid jumping when adding border
        border-bottom: 2px solid white;
    }
`
const NavItems = styled(Box)`
    flex-grow: 1;
    display: flex;
    margin-left: 20px;
    gap: 10px;

`
const NavUser = styled(Box)`
    flex-grow: 0;
`

const pages = [{ name: 'Liste', path: 'listaKorisnika' },
{ name: 'Kreiraj zaposlenog', path: 'kreirajZaposlenog' },
{ name: 'Kreiraj firmu', path: 'kreirajFirmu' },
];

const settings = ['Nalog', 'Opcije', 'Logout'];

function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <StyledAppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <img src={process.env.PUBLIC_URL + '/logo.webp'} alt="Logo" />
                    <NavItems>
                        {pages?.map((page) => (
                            <StyledLink to={page.path}>{page.name}</StyledLink>
                        ))}
                    </NavItems>

                    <NavUser>
                        <Tooltip title="Nalog">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Jeff Smith" src={process.env.PUBLIC_URL + '/diktator100.png'} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings?.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </NavUser>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
}
export default Navbar;
