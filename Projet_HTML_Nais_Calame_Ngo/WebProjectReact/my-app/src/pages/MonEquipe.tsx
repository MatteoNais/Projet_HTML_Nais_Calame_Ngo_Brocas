import React, { useCallback, useEffect, useState } from "react";
import './StylePages.css';
import { Box, Button, Grid, Typography } from "@mui/material";
import CarteJoueur from "../components/CarteJoueur";
import { Link, useParams, } from "react-router-dom";
import Joueur from "../objects/Joueur";
import axiosInstance from "../api/axiosInstance";
import { useAppSelector } from "../hooks/redux-hooks";
import dayjs from "dayjs";
import Draft from "../objects/Draft";
import User from "../objects/User";

interface Params {
    [ligueId: string]: string | undefined;
}

function MonEquipeLigue() {
    const [joueurs, setJoueurs] = useState<Joueur[]>();
    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const { ligueId } = useParams<Params>();
    const { draftId } = useParams<Params>();
    const { userId } = useParams<Params>();
    const [currentDraft, setCurrentDraft] = useState<Draft>();
    const [lastDraft, setLastDraft] = useState<Draft>();
    const [user, setUser] = useState<User>();

    const [totalPoints, setTotalPoints] = useState<number>(0); // Nouvel état pour le total des points
    // On incrémente le compteut de score avec les scores de chaque joueur.
    const handleScoreLoaded = useCallback((score: number) => {
        setTotalPoints(prevTotalScore => prevTotalScore + score);
    }, []);
    // Quand on change de draft on reset le compteur de point.
    const resetTotalPoints = useCallback(() => {
        setTotalPoints(0);
    }, []);
    // get info de la draft actuellement visualisé, pour afficher les dates.
    useEffect(() => {
        axiosInstance.get(`/draft/ligue/${ligueId}`)
            .then(response => {
                console.log(response.data);
                setLastDraft(response.data);
            })
            .catch(error => console.error('Error:', error));
    }, [ligueId]);

    useEffect(() => {
        axiosInstance.get(`/users/id/${userId}`)
            .then(response => {
                console.log("user", response.data);
                console.log(userId);
                setUser(response.data.user);
            })
            .catch(error => console.error('Error:', error));
    }, [userId]);

    useEffect(() => {
        axiosInstance.get(`/draft/ligue/${ligueId}/${draftId}`)
            .then(response => {
                setCurrentDraft(response.data[0].draft);
                console.log("La reponse sur le site" + response);
                console.log(dayjs());
                console.log(dayjs(currentDraft?.date_debut)?.format("YYYY-MM-DD"));
            })
            .catch(error => console.error('Error:', error));
    }, [ligueId, draftId]);
    // Récupérer les id des joueurs et leurs noms et prénoms.
    useEffect(() => {
        console.log("Nouvel id de draft :", draftId);
        axiosInstance.get(`/playersNBA/team/${ligueId}/${userId}/${draftId}`)
            .then(response => {
                console.log(" joueurs" + response.data.player);
                setJoueurs(response.data.player);
            })
            .catch(error => {
                if (error.response == null) {
                    setJoueurs([]);
                }
                console.error('Error:', error);
            });
    }, [ligueId, userId, draftId]);

    // Fonction appelée lorsque le composant est démonté (changement de page).
    useEffect(() => {
        return () => {
            // Réinitialiser le total des points lorsque le composant est démonté
            resetTotalPoints();
        };
    }, [resetTotalPoints]);
    console.log("la dernière draft : " + lastDraft?.id_draft);
    return (
        <div className="body">
            <div className='App-body-ligue'>
                {lastDraft?.id_draft ? (
                    <Grid container spacing={2} sx={{ marginTop: '10vh', display: 'flex', flexWrap: 'wrap' }}>
                        <Grid item xs={12} sx={{ marginLeft: 4, marginRight: 4 }}>
                            {/* Ligne avec le nom equipe les dates des equipes et le total des points */}
                            <Typography variant="h4" textAlign='center' color={'white'}>Equipe de {user?.username} lors de la draft n°{draftId}</Typography>
                        </Grid>
                        <Grid item xs={8} sx={{}}>
                            {/* Terrain avec compo equipe */}
                            <div className="liste-cartes">

                                {joueurs && joueurs.length > 0 && currentDraft?.date_debut && currentDraft?.date_fin && joueurs.map(joueur => (
                                    <CarteJoueur key={joueur.id} dateDebut={dayjs(currentDraft?.date_debut)?.format("YYYY-MM-DD")} dateFin={dayjs(currentDraft?.date_fin)?.format("YYYY-MM-DD")} nom={joueur.nom} prenom={joueur.prenom} joueurId={joueur.id} onScoreLoaded={handleScoreLoaded}></CarteJoueur>
                                ))}
                            </div>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ color: 'white' }}>Total : {totalPoints} points</Typography>
                            <Box display="flex" alignItems="center" justifyContent="center" sx={{
                                backgroundColor: 'grey',
                                border: '2px solid #ff6a00',
                                padding: '10px',
                                marginRight: 3,
                                marginTop: 3,
                                gap: '10px',
                            }}>
                                {Number(draftId) - 1 > 0 && (
                                    <Link to={`/ligue/${ligueId}/${userId}/${Number(draftId) - 1}`}>
                                        <Button variant="contained" disableElevation onClick={resetTotalPoints}> &larr; </Button>
                                    </Link>
                                )}
                                <Typography variant="h5" sx={{ color: 'white' }}>{dayjs(currentDraft?.date_debut)?.format("YYYY-MM-DD HH:mm")} - {dayjs(currentDraft?.date_fin)?.format("YYYY-MM-DD HH:mm")}</Typography>
                                {Number(draftId) + 1 <= (lastDraft?.id_draft ?? 0) &&
                                    <Link to={`/ligue/${ligueId}/${userId}/${Number(draftId) + 1}`}>
                                        <Button variant="contained" disableElevation onClick={resetTotalPoints}> &rarr;</Button>
                                    </Link>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container spacing={2} sx={{ marginTop: '10vh', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                        <Box
                            sx={{
                                backgroundColor: 'grey',
                                border: '2px solid orange',
                                padding: '10px',
                                margin: '10px',
                            }}
                        >
                            <Typography variant="h5" sx={{ color: 'white', textAlign: 'center' }}>
                                Aucune draft n'a été créée pour l'instant
                            </Typography>
                        </Box>
                    </Grid>
                )}
            </div>
        </div >
    );
}

export default MonEquipeLigue;