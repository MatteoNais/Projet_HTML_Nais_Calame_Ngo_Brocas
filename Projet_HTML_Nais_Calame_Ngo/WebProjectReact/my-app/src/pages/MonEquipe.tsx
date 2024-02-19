import React, { useCallback, useEffect, useState } from "react";
import './StylePages.css';
import { Box, Button, Grid, Typography } from "@mui/material";
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

    const [individualScores, setIndividualScores] = useState<{ [key: number]: number }>({});
    const [totalPoints, setTotalPoints] = useState<number>(0);

    const handleScoreChange = (joueurId: number, score: number) => {
        setIndividualScores((prevScores) => ({
            ...prevScores,
            [joueurId]: score,
        }));
    };

    useEffect(() => {
        const scoresArray = Object.values(individualScores);
        const totalScore = scoresArray.reduce((acc, currentScore) => acc + currentScore, 0);
        setTotalPoints(totalScore);
    }, [individualScores]);


    return (
        <div className="body">
            <div className='App-body-ligue'>
                <Grid container spacing={2} sx={{ marginTop: '10vh', display: 'flex', flexWrap: 'wrap' }}>
                    <Grid item xs={12} sx={{ marginLeft: 4, marginRight: 4 }}>
                        {/* Ligne avec le nom equipe les dates des equipes et le total des points */}
                    </Grid>
                    <Grid item xs={8} sx={{}}>
                        {/* Terrain avec compo equipe */}
                        {/* <CarteJoueur joueurId={1641705}></CarteJoueur> */}
                        <div className="liste-cartes">

                            {joueurs && joueurs.map(joueur => (
                                <CarteJoueur key={joueur.id} joueurId={joueur.id} onScoreChange={(score) => handleScoreChange(joueur.id, score)}></CarteJoueur>
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ color: 'white' }}>Total :  {totalPoints} points</Typography>
                        <Box display="flex" alignItems="center" justifyContent="center" sx={{ gap: '10px', marginTop: 3 }}>
                            <Button variant="contained" disableElevation> &larr; </Button>
                            <Typography variant="h5" sx={{ color: 'white' }}>dateDebutDraft </Typography>
                            <Typography variant="h5" sx={{ color: 'white' }}> - </Typography>
                            <Typography variant="h5" sx={{ color: 'white' }}> dateFinDraft</Typography>
                            <Button variant="contained" disableElevation> &rarr;</Button>
                        </Box>
                        {/* remplaçant */}
                        {/* <CarteJoueur joueurId={2544}></CarteJoueur> */}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default MonEquipeLigue;