import React, { useCallback, useEffect, useState } from "react";
import './StylePages.css';
import { Box, Button, Grid, Typography } from "@mui/material";
import CarteJoueur from "../components/CarteJoueur";
import { Link, useParams, } from "react-router-dom";
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
    const { draftId } = useParams<Params>();

    const [totalPoints, setTotalPoints] = useState<number>(0); // Nouvel état pour le total des points
    const handleScoreLoaded = useCallback((score: number) => {
        setTotalPoints(prevTotalScore => prevTotalScore + score);
    }, []);
    const resetTotalPoints = useCallback(() => {
        setTotalPoints(0);
    }, []);

    useEffect(() => {
        console.log("Nouvel id de draft :", draftId);
        axiosInstance.get(`/playersNBA/team/${ligueId}/${basicUserInfo?.id}/${draftId}`)
            .then(response => {
                console.log(response.data.player);
                setJoueurs(response.data.player);
            })
            .catch(error => {
                if (error.response == null) {
                    setJoueurs([]);
                }
                console.error('Error:', error);
            });
    }, [ligueId, basicUserInfo?.id, draftId]);

    // useEffect(() => {
    //     console.log("Joueurs mis à jour :", joueurs);
    //     console.log(draftId);
    // }, [joueurs, draftId]);

    // Fonction appelée lorsque le composant est démonté (changement de page)
    useEffect(() => {
        return () => {
            // Réinitialiser le total des points lorsque le composant est démonté
            resetTotalPoints();
        };
    }, [resetTotalPoints]);

    return (
        <div className="body">
            <div className='App-body-ligue'>
                <Grid container spacing={2} sx={{ marginTop: '10vh', display: 'flex', flexWrap: 'wrap' }}>
                    <Grid item xs={12} sx={{ marginLeft: 4, marginRight: 4 }}>
                        {/* Ligne avec le nom equipe les dates des equipes et le total des points */}
                    </Grid>
                    <Grid item xs={8} sx={{}}>
                        {/* Terrain avec compo equipe */}
                        <div className="liste-cartes">

                            {joueurs && joueurs.length > 0 && joueurs.map(joueur => (
                                <CarteJoueur key={joueur.id} nom={joueur.nom} prenom={joueur.prenom} joueurId={joueur.id} onScoreLoaded={handleScoreLoaded}></CarteJoueur>
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ color: 'white' }}>Total : {totalPoints} points</Typography>
                        <Box display="flex" alignItems="center" justifyContent="center" sx={{ gap: '10px', marginTop: 3 }}>
                            <Link to={`/ligue/${ligueId}/${basicUserInfo?.id}/${Number(draftId) - 1}`}>
                                <Button variant="contained" disableElevation onClick={resetTotalPoints}> &larr; </Button>
                            </Link>
                            <Typography variant="h5" sx={{ color: 'white' }}>dateDebutDraft </Typography>
                            <Typography variant="h5" sx={{ color: 'white' }}> - </Typography>
                            <Typography variant="h5" sx={{ color: 'white' }}>dateFinDraft</Typography>
                            <Link to={`/ligue/${ligueId}/${basicUserInfo?.id}/${Number(draftId) + 1}`}>
                                <Button variant="contained" disableElevation onClick={resetTotalPoints}> &rarr;</Button>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </div >
    );
}

export default MonEquipeLigue;