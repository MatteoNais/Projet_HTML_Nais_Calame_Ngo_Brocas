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


const getRecentStats = async (req: Request, res: Response) => {
    const playerId = req.params.player_id.toString();

    if (playerId === null || playerId === undefined) {
        return res.status(400).json({ message: "Invalid player ID" });
    }

    const playerstats = await Player.getLast5Match(playerId);

    if (!playerstats) {
        res.status(400);
    }

    res.status(200).json(playerstats);
};

const importAllPlayersToBDD = async (req: Request, res: Response) => {


    var data = await Player.getAllPlayers();
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


export { getPlayerbyID, getRecentStats, importAllPlayersToBDD };