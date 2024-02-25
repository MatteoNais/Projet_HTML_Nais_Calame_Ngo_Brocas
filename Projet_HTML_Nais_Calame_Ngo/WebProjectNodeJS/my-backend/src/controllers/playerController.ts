import { Request, Response } from "express";
import Player from "../models/Player";

const getPlayerbyID = async (req: Request, res: Response) => {
    const playerId = req.params.player_id.toString();
    if (playerId === null || playerId === undefined) {
        return res.status(400).json({ message: "Invalid player ID" });
    }

    const player = await Player.findById(playerId);
    console.log(player);
    if (!player) {

        res.status(400);
    }

    res.status(200).json(player);
};

const getPlayerbyIDTeam = async (req: Request, res: Response) => {
    const teamId = req.params.equipeNBA_id.toString();

    if (teamId === null || teamId === undefined) {
        return res.status(400).json({ message: "Invalid team ID" });
    }

    const player = await Player.findByIdTeam(teamId);

    if (!player) {

        res.status(400);
    }

    res.status(200).json(player);
};

const getPlayers = async (req: Request, res: Response) => {

    const player = await Player.getAllPlayers();

    if (!player) {

        res.status(400);
    }

    res.status(200).json(player);
};

const getPlayersbyIdUserAndIdLigue = async (req: Request, res: Response) => {
    const playerId = req.params.player_id.toString();
    const ligueId = req.params.ligue_id.toString();
    const draftId = req.params.draft_id.toString();

    if (playerId === null || playerId === undefined) {
        return res.status(400).json({ message: "Invalid player ID" });
    }
    if (ligueId === null || ligueId === undefined) {
        return res.status(400).json({ message: "Invalid ligue ID" });
    }
    if (draftId === null || draftId === undefined) {
        return res.status(400).json({ message: "Invalid draft ID" });
    }

    const player = await Player.getPlayersInEquipeByUtilisateur(playerId, ligueId, draftId);

    if (!player) {

        res.status(400);
    }
    res.status(200).json(player);
};

const getPlayersByIdEquipe = async (req: Request, res: Response) => {
    const equipeId = req.params.equipe_id.toString();
    if (equipeId === null || equipeId === undefined) {
        return res.status(400).json({ message: "Invalid equipe ID" });
    }
    const player = await Player.getPlayersByIdEquipe(equipeId);
    if (!player) {

        res.status(400);
    }
    res.status(200).json(player);
}

const getRecentStats = async (req: Request, res: Response) => {
    const playerId = req.params.player_id.toString();
    const dateDebut = req.params.date_debut.toString();
    const dateFin = req.params.date_fin.toString();

    if (playerId === null || playerId === undefined) {
        return res.status(400).json({ message: "Invalid player ID" });
    }
    if (dateDebut === null || dateDebut === undefined) {
        return res.status(400).json({ message: "Invalid date_debut" });
    }
    if (dateFin === null || dateFin === undefined) {
        return res.status(400).json({ message: "Invalid date_fin" });
    }
    const playerstats = await Player.getLast5Match(playerId, dateDebut, dateFin);

    if (!playerstats) {
        res.status(400);
    }

    res.status(200).json(playerstats);
};

const getScorePlayer = async (req: Request, res: Response) => {
    const playerId = req.params.player_id.toString();
    const dateDebut = req.params.date_debut.toString();
    const dateFin = req.params.date_fin.toString();

    if (playerId === null || playerId === undefined) {
        return res.status(400).json({ message: "Invalid player ID" });
    }
    if (dateDebut === null || dateDebut === undefined) {
        return res.status(400).json({ message: "Invalid date_debut" });
    }
    if (dateFin === null || dateFin === undefined) {
        return res.status(400).json({ message: "Invalid date_fin" });
    }

    const score = await Player.getScorePlayer(playerId, dateDebut, dateFin);

    if (!score) {
        res.status(400);
    }

    res.status(200).json(score);
}

const getPlayerInfo = async (req: Request, res: Response) => {
    const playerId = req.params.player_id.toString();

    if (playerId === null || playerId === undefined) {
        return res.status(400).json({ message: "Invalid player ID" });
    }

    const infos = await Player.getPlayerInfo(playerId);

    if (!infos) {
        res.status(400);
    }

    res.status(200).json(infos);
};

const getPlayerFantaisyProfileById = async (req: Request, res: Response) => {
    const playerId = req.params.player_id.toString();

    if (playerId === null || playerId === undefined) {
        return res.status(400).json({ message: "Invalid player ID" });
    }

    const player = await Player.getPlayerFantaisyProfile(playerId);

    if (!player) {
        res.status(400);
    }

    res.status(200).json(player);
};

const importAllPlayersToBDD = async (req: Request, res: Response) => {

    var data = await Player.getAllPlayersAPI();
    const player_list = JSON.parse(data);

    var result_list = new Array();
    const nb_players = Object.keys(player_list.resultSets[0].rowSet).length
    for (let index = 0; index < nb_players; index++) {
        // extract data from JSON 
        var player = player_list.resultSets[0].rowSet[index]

        const id = player[0]
        const equipeNBA_id = player[8]
        const nom_prenom = player[2].split(" ");
        const prenom = nom_prenom[0];
        const nom = nom_prenom.slice(1).join(" ");

        player = new Player({ id, equipeNBA_id, nom, prenom })
        result_list.push(player)
        Player.save(player.player)
    }

    if (!player_list) {
        res.status(400);
    }

    res.status(200).json(result_list);
};


export { getPlayerbyID, getRecentStats, importAllPlayersToBDD, getPlayerInfo, getPlayers, getPlayerbyIDTeam, getPlayerFantaisyProfileById, getPlayersbyIdUserAndIdLigue, getScorePlayer, getPlayersByIdEquipe };