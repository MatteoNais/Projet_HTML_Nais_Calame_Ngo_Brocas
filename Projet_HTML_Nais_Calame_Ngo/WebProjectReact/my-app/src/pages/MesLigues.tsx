import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField, Button, FormGroup, Typography, Snackbar, SnackbarContent } from '@mui/material';
import './Main.css'
import { create, getMyLigues, inscriptionLigue } from "../slices/ligueSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Link } from 'react-router-dom';

function Ligues() {
    const dispatch = useAppDispatch();
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [nom, setNom] = useState("");
    const [code_access, setCodeAcces] = useState("");
    const [userId, setUserId] = useState(""); // Utilisez le hook useState
    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const liguesState = useAppSelector((state) => state.ligueArray);
    console.log(liguesState);
    useEffect(() => {
        if (basicUserInfo) {
            dispatch(getMyLigues(basicUserInfo.id));
            setUserId(basicUserInfo.id);
        }

    }, [basicUserInfo, dispatch]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    const handleCreateLigue = async () => {
        if (nom && userId) {
            try {
                await dispatch(
                    create({
                        nom,
                        userId
                    })
                ).unwrap();
                dispatch(getMyLigues(userId));
            } catch (e) {
                console.error(e);
            }
        } else {
        }
    };

    const handleInscriptionLigue = async () => {
        if (userId && code_access) {
            try {
                console.log(userId);
                console.log(code_access);
                await dispatch(
                    inscriptionLigue({
                        userId,
                        code_access
                    })
                ).unwrap();
                dispatch(getMyLigues(userId));

            } catch (e) {
                console.error(e);
            }
        } else {
            console.log("erreur");
        }
    };
    return (
        <div className="body">
            <body className='App-body'>
                <Grid container component="main" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={2} sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }} > <b>Mes ligues : </b>
                            {liguesState.ligue != null ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {JSON.parse(JSON.stringify(liguesState.ligue)).map((ligueData: any, index: any) => (
                                        <li key={index} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Button onClick={() => {
                                                navigator.clipboard.writeText(ligueData.ligue.code_acces);
                                                setOpenSnackBar(true);
                                            }}
                                                variant="contained" sx={{ color: 'white', textAlign: 'left', marginRight: "5vh" }}>
                                                {ligueData.ligue.code_acces}
                                            </Button>
                                            <Snackbar
                                                open={openSnackBar}
                                                autoHideDuration={2000}
                                                onClose={handleClose}
                                                message="Code d'accès copié avec succès."
                                                key="bottom center"
                                                sx={{ textAlign: 'center' }}

                                            >
                                                <SnackbarContent style={{
                                                    backgroundColor: '#0077b6',
                                                    color: 'white',
                                                    padding: '10px',
                                                    borderRadius: '10px',
                                                }}
                                                    message={<span id="client-snackbar">Code d'accès copié dans le presse papier.</span>}
                                                />
                                            </Snackbar>
                                            <Typography variant="h4" sx={{ color: 'orange', textAlign: 'left', marginRight: "5vh" }}>
                                                {ligueData.ligue.nom}
                                            </Typography>

                                            <Link to={`/ligue/${ligueData.ligue.id}/`} key={ligueData.ligue.id}>
                                                <Button variant="contained" disableElevation >
                                                    <b>&rarr;</b>
                                                </Button>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucune ligue disponible.</p>
                            )}
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Paper elevation={2} sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '15px',
                            width: 'fit-content'
                        }} > <b> Créer une ligue </b>
                            <Box sx={{ marginTop: '10px' }}>
                                <FormGroup row>
                                    <TextField variant="outlined" placeholder="nom de la ligue" value={nom}
                                        onChange={(e) => setNom(e.target.value)} />
                                    <Button variant="contained" disableElevation onClick={handleCreateLigue}>
                                        <b>Créer</b>
                                    </Button>
                                </FormGroup>
                            </Box></Paper>
                        <Paper elevation={2} sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '15px',
                            width: 'fit-content'
                        }} > <b> Rejoindre une ligue </b>
                            <Box sx={{ marginTop: '10px' }}>
                                <FormGroup row>
                                    <TextField variant="outlined" placeholder="#123456" value={code_access}
                                        onChange={(e) => setCodeAcces(e.target.value)} />
                                    <Button variant="contained" disableElevation onClick={handleInscriptionLigue}>
                                        <b>&rarr;</b>
                                    </Button>
                                </FormGroup>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </body>
        </div >
    );
}


export default Ligues; 