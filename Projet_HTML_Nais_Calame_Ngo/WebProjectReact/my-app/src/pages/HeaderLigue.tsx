import React, { useEffect, useState } from "react";
import '../pages/Header.css';
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import { Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import logoImg from '../img/basket_logo.png'
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUser, logout } from "../slices/authSlice";
import axiosInstance from "../api/axiosInstance";
import Draft from "../objects/Draft";
interface Params {
    [ligueId: string]: string | undefined;
}

function HeaderLigue() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [currentDraft, setCurrentDraft] = useState<Draft>();
    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

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

    useEffect(() => {
        axiosInstance.get(`/draft/ligue/${ligueId}`)
            .then(response => {
                console.log(response.data);
                setCurrentDraft(response.data);
            })
            .catch(error => console.error('Error:', error));
    }, [ligueId]);

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
                                <Link to='/selectionjoueur'> <Button variant="contained" sx={{ background: '#E36414' }}>selection Test Pierre</Button> </Link>
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
                        {/* <Typography variant="h4" sx={{ color: 'white' }}>{ligueId}</Typography> */}
                        <Link to={`/ligue/${ligueId}/`} style={{ textDecoration: 'none' }}>
                            <Typography variant="h4" sx={{ color: 'white' }}>Accueil</Typography>
                        </Link>
                        <Link to={`/ligue/${ligueId}/${basicUserInfo?.id}/${currentDraft?.id_draft}`} style={{ textDecoration: 'none' }}>
                            <Typography variant="h4" sx={{ color: 'white' }}>Mon Equipe</Typography>
                        </Link>
                        <Link to={`/ligue/${ligueId}/draft`} style={{ textDecoration: 'none' }}>
                            <Typography variant="h4" sx={{ color: 'white' }}>Draft</Typography>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
            <Outlet></Outlet>
        </>
    );
}

export default HeaderLigue;
