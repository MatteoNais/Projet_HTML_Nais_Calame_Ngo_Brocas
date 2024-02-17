import React from 'react';
import { Grid } from '@mui/material';
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