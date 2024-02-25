import React, { useEffect, useState } from 'react';
import '../pages/StylePages.css'
import { useParams } from 'react-router-dom';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axiosInstance from "../api/axiosInstance";
import UserClassement from '../objects/UserClassement';

interface Params {
    [ligueId: string]: string | undefined;
}
function Classement() {
    const { ligueId } = useParams<Params>();
    const [users, setUsers] = useState<UserClassement[]>();

    useEffect(() => {
        axiosInstance.get(`/users/findScore/${ligueId}`) // Remplacez par l'URL de votre API
            .then(response => {
                console.log(response.data);
                const usersData = Array.isArray(response.data) ? response.data : [];

                // Modification de la façon dont les utilisateurs sont stockés dans le state
                setUsers(usersData.map(userData => ('user' in userData) ? userData.user : userData));
                //setUsers(response.data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    if (ligueId) {
        return (

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={2} sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <h2 style={{ color: 'white', backgroundColor: 'orange', width: '100%', textAlign: 'center' }}>Classement Ligue</h2>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Username</TableCell>
                                        <TableCell>Général</TableCell>
                                        <TableCell>Moyenne</TableCell>

                                        {/* Add other table headers here */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users && users.map(user => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.username}</TableCell>
                                            {/* Add other user information here */}
                                            <TableCell>{user.score}</TableCell>
                                            <TableCell>{user.meanScore}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

        );
    }

    else {
        return (
            <h1> pas de ligue de spécifier </h1>
        );
    }
}

export default Classement;