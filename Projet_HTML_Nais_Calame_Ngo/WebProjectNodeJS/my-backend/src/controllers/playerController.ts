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

type playerNBAInfo = {
    id: number;
    equipeNBA_id: number;
    nom: string;
    prenom: string;
    height: string;
    weight: string;
    position: string;
    age: string;
    country: string;
    experience: number;
    PTS: number;
    AST: number;
    REB: number;
    PIE: number;

}

function inchesToMeters(height: string): string {
    const parts = height.split('-');
    if (parts.length !== 2) {
        throw new Error('Invalid height format. Use format like "6-6" for 6 feet 6 inches.');
    }

    const feet = parseFloat(parts[0]);
    const inches = parseFloat(parts[1]);

    if (isNaN(feet) || isNaN(inches)) {
        throw new Error('Invalid height format. Use numbers for feet and inches.');
    }

    const totalInches = feet * 12 + inches;
    const meters = totalInches * 0.0254; // 1 inch = 0.0254 meters

    return meters.toFixed(2);
}

function poundsToKilograms(weightInPounds: string): string {
    const weight = parseFloat(weightInPounds);
    if (isNaN(weight)) {
        throw new Error('Invalid weight format. Please provide a number.');
    }

    const kilograms = weight * 0.453592; // 1 pound = 0.453592 kilograms
    return kilograms.toFixed(0); // Arrondir à 2 décimales et convertir en chaîne de caractères
}

function calculateAge(birthDate: string): string {
    const today = new Date();
    const birth = new Date(birthDate);

    // Vérifier si la date de naissance est valide
    if (isNaN(birth.getTime())) {
        throw new Error('Invalid birth date format. Please provide a valid date string.');
    }

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age.toString();
}

const getPlayerInfo2 = async (player_id: string) => {

    const player_infos = await Player.getPlayerInfo2(player_id);

    try {
        var infos = JSON.parse(player_infos)
    } catch (error) {
        return "error";
    }

    const player: playerNBAInfo = {
        id: infos.resultSets[0]?.rowSet?.[0]?.[0],
        equipeNBA_id: infos.resultSets[0]?.rowSet?.[0]?.[18],
        nom: infos.resultSets[0]?.rowSet?.[0]?.[2],
        prenom: infos.resultSets[0]?.rowSet?.[0]?.[1],
        height: inchesToMeters(infos.resultSets[0]?.rowSet?.[0]?.[11]),
        weight: poundsToKilograms(infos.resultSets[0]?.rowSet?.[0]?.[12]),
        position: infos.resultSets[0]?.rowSet?.[0]?.[15],
        age: calculateAge(infos.resultSets[0]?.rowSet?.[0]?.[7]),
        country: infos.resultSets[0]?.rowSet?.[0]?.[9],
        experience: infos.resultSets[0]?.rowSet?.[0]?.[13],
        PTS: infos.resultSets[1]?.rowSet?.[0]?.[3] !== undefined ? infos.resultSets[1]?.rowSet?.[0]?.[3] : 0,
        AST: infos.resultSets[1]?.rowSet?.[0]?.[4] !== undefined ? infos.resultSets[1]?.rowSet?.[0]?.[4] : 0,
        REB: infos.resultSets[1]?.rowSet?.[0]?.[5] !== undefined ? infos.resultSets[1]?.rowSet?.[0]?.[5] : 0,
        PIE: parseFloat((infos.resultSets[1]?.rowSet?.[0]?.[6] !== undefined ? (infos.resultSets[1]?.rowSet?.[0]?.[6] * 100).toFixed(1) : '0'))
    };
    return player;
};
const getPlayerINFObyIDTeam = async (req: Request, res: Response) => {
    const teamId = req.params.equipeNBA_id.toString();

    if (teamId === null || teamId === undefined) {
        return res.status(400).json({ message: "Invalid team ID" });
    }

    let players: Player[] | null = await Player.findByIdTeam2(teamId);

    if (players === null) {
        players = []
        res.status(400);
    }

    const promises = players.map(player => getPlayerInfo2(player.player.id.toString()));

    const playerInfos = await Promise.all(promises);

    res.status(200).json(playerInfos);
};

export { getPlayerINFObyIDTeam, getPlayerbyID, getRecentStats, importAllPlayersToBDD, getPlayerInfo, getPlayers, getPlayerbyIDTeam, getPlayerFantaisyProfileById, getPlayersbyIdUserAndIdLigue, getScorePlayer, getPlayersByIdEquipe };