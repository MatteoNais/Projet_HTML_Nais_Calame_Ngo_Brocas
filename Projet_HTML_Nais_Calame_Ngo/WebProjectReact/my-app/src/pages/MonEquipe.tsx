import React, { useEffect, useState } from "react";
import './StylePages.css';
import { Grid } from "@mui/material";
import CarteJoueur from "../components/CarteJoueur";
import { useParams } from "react-router-dom";
import Joueur from "../objects/Joueur";
import axiosInstance from "../api/axiosInstance";
import { useAppSelector } from "../hooks/redux-hooks";

interface Params {
    [ligueId: string]: string | undefined;
}

function MonEquipeLigue() {
    const [joueurs, setJoueurs] = useState<Joueur[]>();
    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const { ligueId } = useParams<Params>();

    useEffect(() => {
        axiosInstance.get(`/playersNBA/team/${ligueId}/${basicUserInfo?.id}`)
            .then(response => {
                console.log(response.data.player);
                setJoueurs(response.data.player);
            })
            .catch(error => console.error('Error:', error));
    }, [ligueId, basicUserInfo?.id]);
    return (
        <div className="body">
            <div className='App-body-ligue'>
                <Grid container spacing={2} sx={{ marginTop: '10vh', display: 'flex', flexWrap: 'wrap' }}>
                    <Grid item xs={12} sx={{ marginLeft: 4, marginRight: 4 }}>
                        {/* Ligne avec le nom equipe les dates des equipes et le total des points */}
                    </Grid>
                    <Grid item xs={8} sx={{ marginLeft: 4, marginRight: 4 }}>
                        {/* Terrain avec compo equipe */}
                        {/* <CarteJoueur joueurId={1641705}></CarteJoueur> */}
                        <div className="liste-cartes">

                            {joueurs && joueurs.map(joueur => (
                                <CarteJoueur key={joueur.id} joueurId={joueur.id}></CarteJoueur>
                            ))}
                        </div>

                    </Grid>
                    <Grid item xs={4} sx={{ marginLeft: 4, marginRight: 4 }}>

                        {/* remplaçant */}
                        {/* <CarteJoueur joueurId={2544}></CarteJoueur> */}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default MonEquipeLigue;