import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import Classement from '../components/Classement';
import './StylePages.css';
function AccueilLigue() {

    return (
        <div className="body">
            <div className='App-body-ligue'>
                <Grid container spacing={2} sx={{ marginTop: '2vh' }}>
                    <Grid item xs={6}>
                        {/* Colonne de gauche */}
                        <Grid item xs={12}>
                            {/* Joueur on fire */}
                        </Grid>
                        <Grid item xs={12}>
                            {/* Resultat des match NBA */}
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        {/* Classement des joueurs avec recap des points */}
                        <Classement></Classement>
                        <Box style={{ textAlign: 'center' }}>
                            <Button variant="contained" color="warning" style={{ width: 'fit-content' }}>
                                <Typography variant="h5" sx={{ color: 'white' }}>Démarrer la draft</Typography>
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        {/* Line that takes 15% of the space */}

                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default AccueilLigue;