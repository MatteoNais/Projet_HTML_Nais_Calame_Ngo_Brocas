import React from "react";
import './StylePages.css';
import { Grid } from "@mui/material";
import Classement from "../components/Classement";

function DraftLigue() {
    return (
        <div className="body">
            <div className='App-body-ligue'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/* Ligne avec le type de draft et la recherche avancée et compteur */}
                    </Grid>
                    <Grid item xs={4}>
                        <Grid item xs={12}>
                            {/* Info n tour */}
                        </Grid>
                        <Grid item xs={12}>
                            {/* Recap draft */}
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        {/* Selection des equipes */}
                    </Grid>
                    <Grid item xs={4}>
                        {/* Liste des joueurs */}
                    </Grid>

                </Grid>
            </div>
        </div>
    );
}

export default DraftLigue;