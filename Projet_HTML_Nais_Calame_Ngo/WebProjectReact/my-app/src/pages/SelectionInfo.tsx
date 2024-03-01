import React, { useEffect, useState } from "react";
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import teamNBA from "../objects/TeamNBA";
import playerNBA from "../objects/playerNBA";
import './listeSelection.css';
import './StylePages.css';
import './loading.css'
import PlayerNBACard from "../components/PlayerNBACard";
import TeamNBACard from "../components/TeamNBACard";
import playerNBAInfo from "../objects/playerNBAInfo";
import teamNBAInfo from "../objects/teamNBAInfo";

const colors = {
    BOS: '#008348',
    CHA: '#00788c',
    CHI: '#ce1141',
    CLE: '#6f263d',
    DAL: '#0053bc',
    DEN: '#0e2240',
    DET: '#1d428a',
    GSW: '#006bb6',
    HOU: '#ce1141',
    IND: '#002d62',
    LAC: '#c8102e',
    LAL: '#552583',
    MEM: '#5d76a9',
    MIA: '#98002e',
    MIL: '#00471b',
    MIN: '#0c2340',
    NOP: '#002b5c',
    NYK: '#006bb6',
    OKC: '#007ac1',
    ORL: '#0077c0',
    PHI: '#006bb6',
    PHX: '#1d1160',
    POR: '#e03a3e',
    SAC: '#5a2d81',
    SAS: '#000',
    TOR: '#000',
    UTA: '#002b5c',
    WAS: '#002b5c',
    ZZZ: '#1a1a1a',
};

function SelectionInfo() {
    const [teams, setTeams] = useState<teamNBA[]>([]);
    var [players, setPlayers] = useState<playerNBAInfo[]>([]);
    var [teamInfo, setTeamInfo] = useState<teamNBAInfo>();
    var [selectedTeamItem, setSelectedTeamItem] = useState(Number);
    var [selectedPlayerItem, setSelectedPlayerItem] = useState(Number);
    const [showType, setShowType] = useState(false);
    const [loadingTeam, setLoadingTeam] = useState<boolean>(false);
    const [loadingTeamInfo, setLoadingTeamInfo] = useState<boolean>(false);
    const [hideTeamList, sethideTeamList] = useState<boolean>(false);

    useEffect(() => {
        getAllTeams()
    }, []);

    async function getAllTeams() {
        setLoadingTeam(true);
        axiosInstance.get(`/teamsNBA/all`)
            .then(response => {
                setTeams(response.data.team);
                setLoadingTeam(false);
            })
            .catch(error => console.error('Error:', error));
    }

    async function getallplayerInfo(equipe_id: number) {
        sethideTeamList(true);
        axiosInstance.get(`/playersNBA/info/${equipe_id}`)
            .then(response => {
                setPlayers(response.data);
                sethideTeamList(false);
            })
            .catch(error => console.error('Error:', error));
    }

    async function getteamInfo(equipe_id: number) {
        setLoadingTeamInfo(true);
        axiosInstance.get(`/teamsNBA/infoExtra/${equipe_id}`)
            .then(response => {
                setTeamInfo(response.data);
                setLoadingTeamInfo(false);
            })
            .catch(error => console.error('Error:', error));
    }

    const teamItemClick = (key: number) => {
        if (key != selectedTeamItem) {
            getallplayerInfo(key);
            getteamInfo(key)
            setSelectedTeamItem(key);
        }
        setShowType(false);
    };

    const joueurItemClick = (key: number) => {
        setSelectedPlayerItem(key);
        setShowType(true);
    };


    return (
        <div className="body">
            <div className='App-player-select'>
                <Grid container spacing={2} sx={{ marginTop: '10vh', textAlign: 'center' }}>
                    <Grid item xs={2} className="liste_equipeNBA">
                        {loadingTeam
                            ? (
                                <div className="loader-container">
                                    <div className="loader"></div>
                                </div>
                            )
                            : (
                                <div>
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
                                        ))}
                                    </List>
                                </div>
                            )
                        }
                    </Grid>
                    <Grid item xs={2} className="liste_joueurNBA">
                        {hideTeamList
                            ? (
                                <div className="loader-container">
                                    <div className="loader"></div>
                                </div>
                            )
                            : (
                                <div>
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
                                        ))}
                                    </List>
                                </div>
                            )
                        }
                    </Grid>
                    <Grid item xs={8}>
                        {
                            showType ? (
                                players.find(player => player.id === selectedPlayerItem) ? (
                                    <PlayerNBACard playerinfo={players.find(player => player.id === selectedPlayerItem)!} team_abbreviation={teamInfo?.TEAM_ABBREVIATION!} />
                                ) : (
                                    <div className="loader-container">
                                        <div className="loader"></div>
                                    </div>
                                )
                            ) : (
                                loadingTeamInfo ?
                                    (
                                        <div className="loader-container">
                                            <div className="loader"></div>
                                        </div>
                                    )
                                    : (
                                        teamInfo && (
                                            <TeamNBACard teamInfo={teamInfo} team_abbreviation={teamInfo?.TEAM_ABBREVIATION!}/>
                                        )
                                    )
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default SelectionInfo;