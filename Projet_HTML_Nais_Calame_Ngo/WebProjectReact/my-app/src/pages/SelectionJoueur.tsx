import React, { useEffect, useState } from "react";
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import teamNBA from "../objects/TeamNBA";
import playerNBA from "../objects/playerNBA";
import './listeSelection.css';
import './StylePages.css';




function SelectionJoueur() {
    const [teams, setTeams] = useState<teamNBA[]>([]);
    var [players, setPlayers] = useState<playerNBA[]>([]);
    var [selectedTeamItem, setSelectedTeamItem] = useState(Number);
    var [selectedPlayerItem, setSelectedPlayerItem] = useState(Number);

    useEffect(() => {
        axiosInstance.get(`/teamsNBA/all`) // Remplacez par l'URL de votre API
                .then(response => {
                    console.log(response.data);
                    setTeams(response.data.team);
                })
                .catch(error => console.error('Error:', error));
    }, []);
    
    async function getPlayerfromteam(equipe_id:number) {
        axiosInstance.get(`/playersNBA/team/${equipe_id}`) // Remplacez par l'URL de votre API
            .then(response => {
                console.log(response.data);
                setPlayers(response.data.player);
            })
            .catch(error => console.error('Error:', error));
    }

    const teamItemClick = (key:number) => {
        getPlayerfromteam(key);
        setSelectedTeamItem(key);
    };

    const joueurItemClick = (key:number) => {
        setSelectedPlayerItem(key);
        console.log("action a effectuer en fonction du joueur "+ key)
    };



    return (
        <div className="body">
            <div className='App-player-select'>
                <Grid container spacing={2} sx={{ marginTop: '10vh', textAlign: 'center'  }}>
                    <Grid item xs={2} className="liste_equipeNBA">
                        <Typography variant="h6">
                            Equipe
                        </Typography>
                        <List className="list">
                            {teams.map(team => (
                                <ListItem    key={team.id} 
                                            className="listItem" 
                                            style={{ backgroundColor: selectedTeamItem === team.id ? 'lightgrey' : 'grey' }} 
                                            onClick={() => teamItemClick(team.id)}>
                                <ListItemAvatar>
                                    <Avatar alt={`${team.nom }`} src={` https://cdn.nba.com/logos/nba/${team.id}/global/L/logo.svg `} />
                                </ListItemAvatar>
                                <ListItemText primary={`${team.nom  }`} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={2} className="liste_joueurNBA">
                        <Typography variant="h6">
                            Joueurs
                        </Typography>
                        <List className="list">
                            {players.map(player => (
                                <ListItem   key={player.id} 
                                            className="listItem" 
                                            style={{ backgroundColor: selectedPlayerItem === player.id ? 'lightgrey' : 'grey' }}
                                            onClick={() => joueurItemClick(player.id)}>
                                <ListItemAvatar>
                                    <Avatar alt={`${player.prenom + " " + player.nom  }`} src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`} />
                                </ListItemAvatar>
                                <ListItemText primary={`${player.prenom + " " + player.nom  }`} />
                            </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={8}>
                        {/* Truc a afficher*/}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default SelectionJoueur;