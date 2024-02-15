import { Request, Response } from "express";
import Team from "../models/Team";

const importAllTeamsToBDD = async (req: Request, res: Response) => {
    const data = await Team.getAllTeams()
    const Team_list = JSON.parse(data);

    var result_list = new Array();
    const nb_teams = Object.keys(Team_list).length
    for (let index = 0; index < nb_teams; index++) {
        // extract data from JSON 
        var team = Team_list[index]
        const id = team.id
        const nom = team.full_name
        const abbreviation = team.abbreviation
        const ville = team.city
        team = new Team({id,nom,abbreviation,ville})
        result_list.push(team)
        Team.save(team.team)
    }

    if (!Team_list) {
        res.status(400);
    }

    res.status(200).json(result_list);
};

const getTeambyID = async (req: Request, res: Response) => {
    const teamId = req.params.team_id.toString();
    
    if (teamId === null || teamId === undefined) {
        return res.status(400).json({ message: "Invalid Team ID" });
    }

    const team = await Team.findById(teamId);

    if (!team) {
        res.status(400);
    }

    res.status(200).json(team);
};

export { getTeambyID, importAllTeamsToBDD};