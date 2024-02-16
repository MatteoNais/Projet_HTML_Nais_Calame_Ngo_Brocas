import React, { useEffect, useState } from 'react';
import './StylePages.css'
import { useParams } from 'react-router-dom';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axiosInstance from "../api/axiosInstance";
import User from '../objects/User';
interface Params {
    [ligueId: string]: string | undefined;
}

function AccueilLigue() {
    const { ligueId } = useParams<Params>();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axiosInstance.get(`/users/ligue/${ligueId}`) // Remplacez par l'URL de votre API
            .then(response => {
                console.log(response.data.user);
                setUsers(response.data.user);
            })
            .catch(error => console.error('Error:', error));
    }, []);



    if (ligueId) {
        return (
            <div className="body">
                <div className='App-body-ligue'>
                    <h1> Page Accueil Ligue</h1>
                    <Grid container component="main" spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={2} sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                <h2 style={{ color: 'white', backgroundColor: 'orange', width: '100%', textAlign: 'center' }}>Classement</h2>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Username</TableCell>
                                                <TableCell>Général</TableCell>
                                                <TableCell>Semaine</TableCell>
                                                <TableCell>Moyenne</TableCell>

                                                {/* Add other table headers here */}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map(user => (
                                                <TableRow key={user.id}>
                                                    <TableCell>{user.username}</TableCell>
                                                    {/* Add other user information here */}
                                                    <TableCell>N/A</TableCell>
                                                    <TableCell>N/A</TableCell>
                                                    <TableCell>N/A</TableCell>
                                                </TableRow>

                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

    else {
        return (
            <h1> pas de ligue de spécifier </h1>
        );
    }
}

export default AccueilLigue;