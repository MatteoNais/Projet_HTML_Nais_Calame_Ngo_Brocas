import React, { useEffect, useState } from "react";
import './StylePages.css';
import { Avatar, Button, Grid, Link, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import teamNBA from "../objects/TeamNBA";
import playerNBA from "../objects/playerNBA";
import User from "../objects/User";
import Joueur from "../objects/Joueur";
import CarteJoueur from "../components/CarteJoueur";
import { useParams } from "react-router-dom";
import './listeSelection.css';
import './StylePages.css';
import { useAppSelector } from "../hooks/redux-hooks";

interface Params {
    [ligueId: string]: string | undefined;
}
function DraftLigue() {
    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    var [this_team, setThisTeam] = useState(Number);
    const [users, setUsers] = useState<User[]>([]);
    const [teams, setTeams] = useState<teamNBA[]>([]);
    var [players, setPlayers] = useState<playerNBA[]>([]);
    const [joueurs, setJoueurs] = useState<Joueur[]>();
    var [selectedTeamItem, setSelectedTeamItem] = useState(Number);
    var [selectedPlayerItem, setSelectedPlayerItem] = useState(Number);
    const { ligueId } = useParams<Params>();
    var [selected_player, setSelectedPlayer] = useState<playerNBA | null>(null);

    console.log(ligueId);
    console.log(basicUserInfo?.id);
    useEffect(() => {
        axiosInstance.get(`/equipe/byLigueAndUser/${ligueId}/${basicUserInfo?.id}`) // Remplacez par l'URL de votre API
            .then(response => {
                console.log(response.data);
                setThisTeam(response.data.equipe.id);
                console.log(response.data.equipe);
                console.log(response.data.equipe.id);
                console.log(this_team);
            })
            .catch(error => console.error('Error:', error));
    }, [ligueId]);


    useEffect(() => {
        axiosInstance.get(`/playersNBA/team/${ligueId}/${basicUserInfo?.id}`)
            .then(response => {
                console.log(response.data.player);
                setJoueurs(response.data.player);
            })
            .catch(error => console.error('Error:', error));
    }, [ligueId, basicUserInfo?.id]);



    useEffect(() => {
        axiosInstance.get(`/equipe/byLigue/${ligueId}`) // Remplacez par l'URL de votre API
            .then(response => {
                console.log(response.data);
                setUsers(response.data.users);
            })
            .catch(error => console.error('Error:', error));
    }, [ligueId]);



    useEffect(() => {
        axiosInstance.get(`/teamsNBA/all`) // Remplacez par l'URL de votre API
            .then(response => {
                console.log(response.data);
                setTeams(response.data.team);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    async function getPlayerfromteam(equipe_id: number) {
        axiosInstance.get(`/playersNBA/team/${equipe_id}`) // Remplacez par l'URL de votre API
            .then(response => {
                console.log(response.data);
                setPlayers(response.data.player);
            })
            .catch(error => console.error('Error:', error));
    }

    async function getPlayerCard(player_id: number) {
        axiosInstance.get(`/playersNBA/${player_id}`) // Remplacez par l'URL de votre API
            .then(response => {
                console.log(response.data);
                setSelectedPlayer(response.data.player);
                /*id_joueur = response.data.player.id;
                console.log(id_joueur);*/
            })
            .catch(error => console.error('Error:', error));
    }

    async function draftPlayer(team_id: number, player_id: number) {
        try {
            console.log(team_id, player_id);
            const response = await axiosInstance.post(`/equipe/addJoueurNBA/${team_id}/${player_id}`, {
                // team_id: team_id,
                // player_id: player_id
            });

            console.log(response.data);
            setSelectedPlayer(response.data.player);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const teamItemClick = (key: number) => {
        getPlayerfromteam(key);
        setSelectedTeamItem(key);
    };

    const joueurItemClick = (key: number) => {
        getPlayerCard(key);
        setSelectedPlayerItem(key);
        //console.log("action a effectuer en fonction du joueur "+ key)
    };

    const draftPlayerClick = (teamkey: number, playerkey: number) => {
        draftPlayer(teamkey, playerkey);
    };

    return (
        <div className="body">
            <div className='App-body-ligue'>
                <Grid container spacing={2} sx={{ marginTop: '5vh', textAlign: 'center' }}>
                    <Grid item xs={12}>
                        {/* Ligne avec le type de draft et la recherche avancée et compteur */}
                    </Grid>
                    <Grid item xs={4} sx={{ marginLeft: 4, marginRight: 4 }}>
                        <Grid item xs={12}>
                            {/* Info n tour */}
                        </Grid>

                        <Grid item xs={12} bgcolor={"white"} color={"white"} sx={{ height: '50vh', display: 'flex', flexWrap: 'wrap', backgroundColor: "grey", border: "3px solid #ff6a00" }}>
                            <Grid item xs={12} md={12}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    Récapitulatif de votre draft
                                </Typography>
                            </Grid>
                            {/* Vérifiez d'abord si joueurs est défini pour éviter les erreurs */}
                            {joueurs && joueurs.map(joueur => (
                                <Grid key={joueur.id} item xs={12} sm={6} md={4} lg={3} >
                                    <img
                                        src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${joueur.id}.png`}
                                        alt="Image joueur"
                                        style={{ width: "80%", height: "auto" }}
                                    />
                                    <Typography sx={{ fontWeight: 'bold' }}> {joueur.prenom + " " + joueur.nom} </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={2} className="liste_equipeNBA">
                        <Typography variant="h6">
                            Equipe
                        </Typography>
                        <List className="list">
                            {teams.map(team => (
                                <ListItem key={team.id}
                                    className="listItem"
                                    style={{ backgroundColor: selectedTeamItem === team.id ? 'lightgrey' : 'grey' }}
                                    onClick={() => teamItemClick(team.id)}>
                                    <ListItemAvatar>
                                        <Avatar alt={`${team.nom}`} src={` https://cdn.nba.com/logos/nba/${team.id}/global/L/logo.svg `} />
                                    </ListItemAvatar>
                                    <ListItemText primary={`${team.nom}`} />
                                </ListItem>
                            ))}                    {/* Selection des equipes */}
                        </List>
                    </Grid>
                    <Grid item xs={2} className="liste_joueurNBA">
                        <Typography variant="h6">
                            Joueurs
                        </Typography>
                        <List className="list">
                            {players.map(player => (
                                <ListItem key={player.id}
                                    className="listItem"
                                    style={{ backgroundColor: selectedPlayerItem === player.id ? 'lightgrey' : 'grey' }}
                                    onClick={() => joueurItemClick(player.id)}>
                                    <ListItemAvatar>
                                        <Avatar alt={`${player.prenom + " " + player.nom}`} src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`} />
                                    </ListItemAvatar>
                                    <ListItemText primary={`${player.prenom + " " + player.nom}`} />
                                </ListItem>
                            ))}                    {/* Liste des joueurs */}
                        </List>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6">
                            Carte joueur :
                        </Typography>
                        {selected_player && (
                            <>
                                <CarteJoueur key={selected_player.id} joueurId={selected_player.id as number} />
                                <p> Id joueur : {selected_player.id}</p>
                                <Button variant="contained" disableElevation onClick={() => draftPlayerClick(this_team as number, selected_player?.id as number)}>
                                    <b>Drafter le joueur</b>
                                </Button>
                            </>
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default DraftLigue;