import React, { useEffect } from "react";
import '../pages/Header.css';
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import logoImg from '../img/basket_logo.png'
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUser, logout } from "../slices/authSlice";

interface Params {
    [ligueId: string]: string | undefined;
}

function HeaderLigue() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

    useEffect(() => {
        if (basicUserInfo) {
            dispatch(getUser(basicUserInfo.id));
        }
    }, [basicUserInfo]);


    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            navigate("/login");
        } catch (e) {
            console.error(e);
        }
    };

    const { ligueId } = useParams<Params>();


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
                                <Link to='/'> <Button variant="contained" sx={{ background: '#E36414' }}> Mes ligues</Button> </Link>
                                <Link to='/resultats'> <Button variant="contained" sx={{ background: '#E36414' }}>NBA</Button> </Link>
                                <Link to='/'> <Button variant="contained" sx={{ background: '#E36414' }}>{basicUserInfo?.username}</Button> </Link>
                                <Button variant="contained" sx={{ background: '#E36414' }} onClick={handleLogout} >Logout</Button>

                            </Box>

                        </Toolbar>
                    </AppBar>
                </Box>
            </div >
            <Grid container className="grid-container" justifyContent="center" alignItems="center">
                <Grid item className="grid-item">
                    <Box sx={{ display: 'flex', gap: '5vh', flexWrap: 'wrap', justifyContent: 'space-between', paddingLeft: '10vh', paddingRight: '10vh' }}>
                        <h3> {ligueId}</h3>
                        <Link to={`/ligue/${ligueId}/`}> <Button variant="contained" sx={{ background: '#E36414' }}>Accueil</Button> </Link>
                        <Link to={`/`}> <Button variant="contained" sx={{ background: '#E36414' }}>Mon Equipe</Button> </Link>
                        <Link to={`/`}> <Button variant="contained" sx={{ background: '#E36414' }}>Draft</Button> </Link>
                    </Box>
                </Grid>
            </Grid>
            <Outlet></Outlet>
        </>
    );
}

export default HeaderLigue;
