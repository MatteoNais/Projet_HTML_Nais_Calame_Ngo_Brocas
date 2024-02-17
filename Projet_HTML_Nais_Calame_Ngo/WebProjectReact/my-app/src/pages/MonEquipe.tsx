import React from "react";
import './StylePages.css';
import { Grid } from "@mui/material";
import CarteJoueur from "../components/CarteJoueur";
import { useParams } from "react-router-dom";


function MonEquipeLigue() {
    return (
        <div className="body">
            <div className='App-body-ligue'>
                <Grid container spacing={2} sx={{ marginTop: '10vh' }}>
                    <Grid item xs={12} sx={{ marginLeft: 4, marginRight: 4 }}>
                        {/* Ligne avec le nom equipe les dates des equipes et le total des points */}
                    </Grid>
                    <Grid item xs={8} sx={{ marginLeft: 4, marginRight: 4 }}>
                        {/* Terrain avec compo equipe */}
                        <CarteJoueur joueurId={1641705}></CarteJoueur>

                    </Grid>
                    <Grid item xs={4} sx={{ marginLeft: 4, marginRight: 4 }}>
                        {/* remplaçant */}
                        <CarteJoueur joueurId={2544}></CarteJoueur>

                    </Grid>

                </Grid>
            </div>
        </div>
    );
}

export default MonEquipeLigue;