import * as React from 'react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logoImg from '../img/basket_logo.png'
import './Header.css';
import { Outlet, Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <div className="app-header">
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar className="appbar" sx={{ bgcolor: "#343a40" }} position="fixed">
                        <Toolbar>
                            <Link to='/' className="logo-link">
                                <Box display={"flex"} alignItems={"center"} gap={0.5}>
                                    <img className="logo-basket" width="54px" height="54px" src={logoImg} alt="logo" />
                                    <Typography variant='h4' sx={{ color: '#E36414', width: 'fit-content' }}> BasketiX </Typography>
                                </Box>
                            </Link>
                            <Box sx={{
                                marginLeft: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '16px', // Ajustez la largeur selon vos besoins
                            }} >
                                <Link to='/resultats'> <Button variant="contained" sx={{ background: '#E36414' }}>Resultat</Button> </Link>
                                <Link to='/resultats'> <Button variant="contained" sx={{ background: '#E36414' }}>Actu</Button> </Link>
                                <Link to='/resultats'> <Button variant="contained" sx={{ background: '#E36414' }}>Autre</Button> </Link>
                            </Box>

                        </Toolbar>
                    </AppBar>
                </Box>
            </div >
            <Outlet></Outlet>
        </>
    );
}

export default Header;