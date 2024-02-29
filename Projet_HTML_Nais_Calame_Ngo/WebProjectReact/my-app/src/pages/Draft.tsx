import React, { useEffect, useState } from "react";
import './listeSelection.css';
import './StylePages.css';
import axiosInstance from "../api/axiosInstance";
import { Avatar, Box, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CarteJoueur from "../components/CarteJoueur";
import dayjs from "dayjs";
import teamNBA from "../objects/TeamNBA";
import playerNBA from "../objects/playerNBA";
import Draft_obj from "../objects/Draft";
import DraftType from "../objects/DraftType";

import { useAppSelector } from "../hooks/redux-hooks";
import { useParams } from "react-router-dom";
import Pick from "../objects/Pick";

interface Params {
    [ligueId: string]: string | undefined;
}

function Draft() {
    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const { ligueId } = useParams<Params>();
    var [draft, setDraft] = useState<Draft_obj>();
    var [type_draft, setTypeDraft] = useState<DraftType>();
    const [equipe_utilisateur, setEquipeUtilisateur] = useState<teamNBA>();

    console.log(draft);
    useEffect(() => {
        // Effect qui s'exécute lorsque draft est modifié
        console.log(draft?.id_draft);
    }, [draft]);
    //console.log(type_draft?.type_draft);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get(`/draft/ligue/${ligueId}`)
            .then(response => {
                setDraft(response.data);
                setLoading(false); // Marquer le chargement comme terminé
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false); // Marquer le chargement comme terminé même en cas d'erreur
            });
    }, [ligueId]);

    useEffect(() => {
        axiosInstance.get(`/draft/id/${draft?.id_draft}`)
            .then(response => {
                console.log(response.data);
                setTypeDraft(response.data[0]);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [draft]);

    useEffect(() => {
        if (!loading && draft) { // Vérifier si le chargement est terminé et si draft est défini
            axiosInstance.get(`/equipe/byLigueAndUserAndDraft/${ligueId}/${basicUserInfo?.id}/${draft?.id_draft}`)
                .then(response => {
                    setEquipeUtilisateur(response.data);
                    getPicks(); // Appeler getPicks() lorsque draft est défini
                })
                .catch(error => console.error('Error:', error));
        }
    }, [ligueId, basicUserInfo, draft, loading]);


    const [equipes_draft, setEquipesDraft] = useState<teamNBA[]>();

    useEffect(() => {
        //console.log("ByLigueAndData");
        if (draft)
        {
            axiosInstance.get(`/equipe/byLigueAndByDraft/${ligueId}/${draft?.id_draft}`)
            .then(response => {
                //console.log(response.data);
                setEquipesDraft(response.data);
            })
            .catch(error => console.error('Error:', error));
        }
    }, [ligueId, draft]);
    
    
    const [teams, setTeams] = useState<teamNBA[]>([]);
    var [selectedTeamItem, setSelectedTeamItem] = useState(Number);
    var [selectedPlayerItem, setSelectedPlayerItem] = useState(Number);
    var [players, setPlayers] = useState<playerNBA[]>([]);
    var [selected_player, setSelectedPlayer] = useState<playerNBA | null>(null);

    //const [this_team, setThisTeam] = useState(Number);

    useEffect(() => {
        axiosInstance.get(`/teamsNBA/all`)
            .then(response => {
                //console.log(response.data);
                setTeams(response.data.team);
                teamItemClick(response.data.team[0].id);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    async function getPlayerfromteam(equipe_id: number) {
        axiosInstance.get(`/playersNBA/team/${equipe_id}`)
            .then(response => {
                //console.log(response.data);
                setPlayers(response.data.player);
                joueurItemClick(response.data.player[0].id);
                //console.log(picks);
            })
            .catch(error => console.error('Error:', error));
    }

    async function getPlayerCard(player_id: number) {
        axiosInstance.get(`/playersNBA/${player_id}`)
            .then(response => {
                //console.log(response.data);
                setSelectedPlayer(response.data.player);
            })
            .catch(error => console.error('Error:', error));
    }   

    const teamItemClick = (key: number) => {
        getPlayerfromteam(key);
        setSelectedTeamItem(key);
    }

    const joueurItemClick = (key: number) => {
        getPlayerCard(key);
        setSelectedPlayerItem(key);
    }

    var [drafted_players, setDraftedPlayers] = useState<Pick[]>([]);
    const filteredPlayers = drafted_players.filter(player => player.equipe === equipe_utilisateur?.id);


    /*const show = () => {
        console.log(drafted_players);
    }*/
    
    async function getPicks() {
        console.log("Updating...");
        console.log(draft);
        if (draft) {
            axiosInstance.get(`/draft/players_drafted_by_draft/${draft?.id_draft}`)
                .then(response => {
                    //console.log(response.data);
                    setDraftedPlayers(response.data);
                    //console.log(response.data[response.data.length - 1]);
                    //console.log(lastPlayer);
                    let val = 0;
                    if (response.data.length != 0)
                    {
                        val = response.data[response.data.length - 1].joueur_NBA;

                    }
                    if (val !== lastPlayer) {
                        //console.log(val);
                        setLastPlayer(val as number);
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }

    const draftPlayerClick = (teamkey: number, playerkey: number) => {
        //returnPlayerState(playerkey);
        if (equipes_draft)
        {
            if (drafted_players.length < equipes_draft?.length * 10)
            {
                if (filteredPlayers.length < 10)
                {
                    if (returnPlayerState(playerkey) === "possible") {
                        if (currentUserTurn() === true)
                        {
                            draftPlayer(teamkey, playerkey)
                                .then(() => {
                                    // Update picks after successfully drafting a player
                                    getPicks();
                                    // Envoyer la sélection au serveur via WebSocket
                                    //socket.emit("draft", teamkey, playerkey);
                                })
                                .catch(error => {
                                    console.error('Error drafting player:', error);
                                });
                        } else {
                        console.log("It's not your turn to draft a player");
                        setInfo("Ce n'est pas à vous de sélectionner un nouveau joueur.");
                        openModalInfo();
                        }
                    } else {
                        console.log("You could not draft " + playerkey);
                        setInfo("Ce joueur a déjà été sélectionné.");
                        openModalInfo();
                    }
                } else {
                    console.log("You could not draft " + playerkey);
                    setInfo("Vous avez déjà sélectionné 10 joueurs.");
                    openModalInfo();
                }    
            }
            else {
                console.log("You could not draft " + playerkey);
                setInfo("La draft est finie.");
                openModalInfo();
            }
        }   

    };

    const returnPlayerState = (key: number) => {
        //console.log(drafted_players);
        if (drafted_players.some(player => player.joueur_NBA === key)) {
            console.log(key + " has already been drafted.");
            return "impossible";
        }
        else {
            console.log(key + " has not been drafted yet.");
            return "possible";
        }
    };

    const checkUserDraft = () => {
        if (drafted_players && equipes_draft) {
            const totalPicks = drafted_players.length;
            //const teamsCount = equipes_draft.length;
            //return Math.floor(totalPicks / teamsCount) + 1;
            return totalPicks;
        }
        return 1;
    };

    const currentUserTurn = () => {
        if (equipe_utilisateur && equipes_draft) {
            const userIndex = equipes_draft.findIndex(equipe => equipe.id === equipe_utilisateur.id);
            const currentTurn = checkUserDraft();
            //console.log(userIndex);
            //console.log(currentTurn % equipes_draft.length);
            return userIndex === currentTurn % equipes_draft.length;
        }
        return false;
    };

    async function draftPlayer(team_id: number, player_id: number) {
        try {
            if(equipe_utilisateur){
            //console.log(team_id, player_id);
            const response = await axiosInstance.post(`/equipe/addJoueurNBA/${team_id}/${player_id}`, {
                // team_id: team_id,
                // player_id: player_id
            });
            
            openModal();

            setSelectedPlayer(response.data.player);
        }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    var [indice_tour, setIndice_tour] = useState<number>(1);
    var [tour_players, setTour_players] = useState<Pick[]>();

    useEffect(() => {
        if (equipes_draft)
        {
            const tourPlayers = [];
            const startIndex = (indice_tour - 1) * equipes_draft.length;
            for (let i = startIndex; i < (startIndex + equipes_draft.length); i++) {
                //console.log(i);
                if (drafted_players && drafted_players[i] != null) {
                    tourPlayers.push(drafted_players[i]);
                    //console.log(tourPlayers);
                }
            }
            setTour_players(tourPlayers);
        }
    }, [equipes_draft, drafted_players])

    const Dim_index_tour = () => {
        if (equipes_draft) {
        // Tableau pour stocker les joueurs du tour actuel
        const tourPlayers = [];

        if (indice_tour > 1)
        {
            const newIndiceTour = indice_tour - 1;
            setIndice_tour(newIndiceTour);
            //Contrainte_tour_recap(newIndiceTour);
            //console.log(indice_tour);
        
            const startIndex = (newIndiceTour - 1) * equipes_draft.length;
            for (let i = startIndex; i < (startIndex + equipes_draft.length); i++) {
                //console.log(i);
                if (drafted_players && drafted_players[i] != null) {
                    tourPlayers.push(drafted_players[i]);
                    console.log(tourPlayers);
                }
            }
            setTour_players(tourPlayers);
        }
        }
    }

    const Aug_index_tour = () => {
        if (equipes_draft)
        {
        const tourPlayers = [];

        if (indice_tour < 10)
        {
            const newIndiceTour = indice_tour + 1;
            setIndice_tour(newIndiceTour);
            //Contrainte_tour_recap(newIndiceTour);
            //console.log(indice_tour);
            
            const startIndex = (newIndiceTour - 1) * equipes_draft.length;
            for (let i = startIndex; i < startIndex + equipes_draft.length; i++) {
                //console.log(i);
                if (drafted_players && drafted_players[i] != null) {
                    tourPlayers.push(drafted_players[i]);
                    console.log(tourPlayers);
                }
            }
            setTour_players(tourPlayers);
        }
    }
    }

    const [tourContrainte, settourContrainte] = useState<string>();

    useEffect(() => {
        Contrainte_tour_recap(indice_tour);
    }, [type_draft, indice_tour]);

    const Contrainte_tour_recap = (i : number) => {
        if (type_draft)
        {
            //console.log(filteredPlayers.length);
            switch (i)
            {
                case 1:
                    settourContrainte(type_draft.contrainte1);
                    break;
                case 2:
                    settourContrainte(type_draft.contrainte2);
                    break;
                case 3:
                    settourContrainte(type_draft.contrainte3);
                    break;
                case 4:
                    settourContrainte(type_draft.contrainte4);
                    break;
                case 5:
                    settourContrainte(type_draft.contrainte5);
                    break;
                case 6:
                    settourContrainte(type_draft.contrainte6);
                    break;
                case 7:
                    settourContrainte(type_draft.contrainte7);
                    break;
                case 8:
                    settourContrainte(type_draft.contrainte8);
                    break;
                case 9:
                    settourContrainte(type_draft.contrainte9);
                    break;
                case 10:
                    settourContrainte(type_draft.contrainte10);
                    break;
            }

        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Récupérer les mises à jour des sélections des autres utilisateurs
            if (!loading && draft) {
                console.log("Searching...");
                getPicks();
            }
        }, 5000); // Par exemple, vérifier toutes les 5 secondes
    
        // Nettoyer l'intervalle lors du démontage du composant
        return () => clearInterval(intervalId);
    }, [loading, draft]);

    const [showModal, setShowModal] = useState(false);
    const [showModalInfo, setShowModalInfo] = useState(false);
    const [Info, setInfo] = useState<string>();


    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const openModalInfo = () => {
        setShowModalInfo(true);
    };
    const closeModalInfo = () => {
        setShowModalInfo(false);
    };

    const [lastPlayer, setLastPlayer] = useState<number>();

    useEffect(() => {
        if (lastPlayer !== undefined) {
            openModal();
        }
    }, [lastPlayer]);

    const [stateDraft, setStateDraft] = useState<string>("Draft non commencée.");

    useEffect(() => {
        if (equipes_draft) 
        { 
            if (drafted_players.length === 0)
            {
                setStateDraft("Draft non commencée.");
            }
            if (drafted_players.length > 0 && drafted_players.length < equipes_draft?.length * 10)
            {
                setStateDraft("Draft en cours...");
            }
            else if (drafted_players.length === equipes_draft?.length * 10)
            {
                setStateDraft("Draft terminée.");
            }
        }
    }, [draft, drafted_players.length])

    const [currentContrainte, setcurrentContrainte] = useState<string>();
    const [maxDraft, setmaxDraft] = useState<number>();
    const [checkCondition, setcheckCondition] = useState<boolean>(false);

    useEffect(() => {
    if (draft)
    {
        if (!checkCondition)
        {
            setcheckCondition(true);
            setmaxDraft(draft.id_draft);
        } 
    }
    });


    useEffect(() => {
        if (filteredPlayers && type_draft)
        {
            console.log(filteredPlayers.length);
            switch (filteredPlayers.length)
            {
                case 0:
                    setcurrentContrainte(type_draft.contrainte1);
                    break;
                case 1:
                    setcurrentContrainte(type_draft.contrainte2);
                    break;
                case 2:
                    setcurrentContrainte(type_draft.contrainte3);
                    break;
                case 3:
                    setcurrentContrainte(type_draft.contrainte4);
                    break;
                case 4:
                    setcurrentContrainte(type_draft.contrainte5);
                    break;
                case 5:
                    setcurrentContrainte(type_draft.contrainte6);
                    break;
                case 6:
                    setcurrentContrainte(type_draft.contrainte7);
                    break;
                case 7:
                    setcurrentContrainte(type_draft.contrainte8);
                    break;
                case 8:
                    setcurrentContrainte(type_draft.contrainte9);
                    break;
                case 9:
                    setcurrentContrainte(type_draft.contrainte10);
                    break;
                case 10:
                    setcurrentContrainte(" ");
                    break;
            }

        }
    }, [type_draft, filteredPlayers]);


    async function Dim_index_draft() {
        if (type_draft && type_draft.id > 1) {
            try {
                const response = await axiosInstance.get(`/draft/ligue/${ligueId}/${type_draft.id - 1}`);
                console.log(response.data[0]);
                setDraft(response.data[0]);
                setLoading(false); // Marquer le chargement comme terminé
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
    
    async function Aug_index_draft() {
        console.log(type_draft);
        if (type_draft && maxDraft && type_draft.id < maxDraft) {
            console.log(maxDraft);
            try {
                const response = await axiosInstance.get(`/draft/ligue/${ligueId}/${type_draft.id + 1}`);
                console.log(response.data[0]);
                setDraft(response.data[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    return (
        <div className="body">
            <div className='App-body-ligue'>
            {showModal && drafted_players.length != 0 && (
                <div className="modal-container">
                    <div className="modal">
                        <h2>Avec le {drafted_players.length}e choix de draft...</h2>
                        <Table>
                            <TableCell>{drafted_players[drafted_players.length - 1].utilisateur} a sélectionné {drafted_players[drafted_players.length - 1].prenom} {drafted_players[drafted_players.length - 1].nom}</TableCell>
                            <TableCell>                    
                                <Avatar src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${drafted_players[drafted_players.length - 1].joueur_NBA}.png`} />
                            </TableCell>
                        </Table>
                        <button onClick={closeModal}>Fermer</button>
                    </div>
                </div>
            )}

            {showModalInfo && (
                <div className="modal-container">
                    <div className="modal">
                        <h2>{Info}</h2>
                        <button onClick={closeModalInfo}>Fermer</button>
                    </div>
                </div>
            )}
        </div>
                <Grid container spacing={2} sx={{ marginTop: '5vh', textAlign: 'center' }}>
                    <Grid item xs={12}>
                        {/* Ligne avec le type de draft et la recherche avancée et compteur */}
                        <Table>
                        <TableCell><Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            <Button variant="contained" disableElevation onClick={Dim_index_draft}> &larr; </Button>
                            <Typography variant="h5" sx={{ color: 'white' }}> Draft {type_draft?.id} : {type_draft?.type_draft}  </Typography>
                            <Button variant="contained" disableElevation onClick={Aug_index_draft}> &rarr;</Button>
                        </Typography></TableCell>
                        <TableCell><Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Contrainte sur le tour en cours : {currentContrainte}
                        </Typography></TableCell>
                        <TableCell><Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {stateDraft}
                        </Typography></TableCell>
                    </Table>  
                    </Grid>
                    <Grid item xs={4} sx={{ marginLeft: 4, marginRight: 4 }}>
                        <Grid item xs={12} bgcolor={"white"} color={"white"} sx={{ height: '50vh', display: 'flex', flexWrap: 'wrap', backgroundColor: "grey", border: "3px solid #ff6a00" }}>
                            <Grid item xs={12} md={12}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    Récapitulatif de votre draft
                                </Typography>
                            </Grid>
                            
                            {filteredPlayers && filteredPlayers.map(joueur => (
                                <Grid key={joueur.joueur_NBA} item xs={12} sm={6} md={4} lg={3} >
                                    <img
                                        src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${joueur.joueur_NBA}.png`}
                                        alt="Image joueur"
                                        style={{ width: "80%", height: "auto" }}
                                    />
                                    <Typography sx={{ fontWeight: 'bold' }}> {joueur.prenom + " " + joueur.nom} </Typography>
                                </Grid>
                            ))}
                            
                        </Grid>

                        <Grid item xs={12} bgcolor={"white"} color={"white"} sx={{ height: '50vh', display: 'flex', flexWrap: 'wrap', backgroundColor: "grey", border: "3px solid #ff6a00" }}>
                            <Grid item xs={12} md={12}>
                                <Box display="flex" alignItems="center" justifyContent="center" sx={{ gap: '10px', marginTop: 3 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Tour de draft
                                </Typography>
                                <Button variant="contained" disableElevation onClick={Dim_index_tour}> &larr; </Button>
                                <Typography variant="h5" sx={{ color: 'white' }}> {indice_tour} </Typography>
                                <Button variant="contained" disableElevation onClick={Aug_index_tour}> &rarr;</Button>
                                <Typography variant="h5" sx={{ color: 'white' }}> Contrainte : {tourContrainte} </Typography>
                                </Box>
                            </Grid>
                            
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Utilisateur</TableCell>
                                            <TableCell>Choix</TableCell>
                                            <TableCell>Joueur</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {equipes_draft && equipes_draft.map((equipe, index) => (
                                            <TableRow key={equipe.id}>
                                                <TableCell><Typography sx={{ fontWeight: 'bold' }}> {equipe.nom} </Typography></TableCell>
                                                <TableCell>{(indice_tour - 1) * equipes_draft.length + index + 1}</TableCell>
                                                <TableCell>{tour_players && tour_players[index] && (
                                            <Typography> {tour_players[index].nom} {tour_players[index].prenom} </Typography>)} </TableCell>
                                            <TableCell>{tour_players && tour_players[index] && (<ListItemAvatar>
                                        <Avatar src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${tour_players[index].joueur_NBA}.png`} />
                                    </ListItemAvatar>)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
                                <CarteJoueur key={selected_player.id} nom={selected_player.nom} prenom={selected_player.prenom} dateDebut={"2023-10-23"} dateFin={dayjs().format('YYYY-MM-DD')} joueurId={selected_player.id as number} />
                                <p> Id joueur : {selected_player.id}</p>
                                {<Button variant="contained" disableElevation onClick={() => draftPlayerClick(equipe_utilisateur?.id as number, selected_player?.id as number)}>
                                    <b>Drafter le joueur</b>
                            </Button>}
                            {/*<Button variant="contained" disableElevation onClick={() => show()}>
                                    <b>Montrer</b>
                        </Button>*/}
                            </>
                        )}
                            {/*<List>
                            {equipes_draft && equipes_draft.map((equipe, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={equipe.id} />
                                </ListItem>
                            ))}
                            {equipe_utilisateur?.id}
                            </List>*/}
                    </Grid>
                </Grid>
            </div>
    );
}
export default Draft;