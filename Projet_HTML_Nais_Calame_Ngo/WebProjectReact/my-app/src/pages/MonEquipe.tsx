import React from "react";
import './StylePages.css';
import { Grid } from "@mui/material";


function MonEquipeLigue() {
    return (
        <div className="body">
            <div className='App-body-ligue'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/* Ligne avec le nom equipe les dates des equipes et le total des points */}
                    </Grid>
                    <Grid item xs={8}>
                        {/* Terrain avec compo equipe */}
                    </Grid>
                    <Grid item xs={4}>
                        {/* remplaçant */}
                    </Grid>

                </Grid>
            </div>
        </div>
    );
}

export default MonEquipeLigue;