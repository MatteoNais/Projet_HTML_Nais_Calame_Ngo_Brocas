import { Request, Response } from "express";
import Team from "../models/Team";

const getTeambyID = async (req: Request, res: Response) => {
    const teamId = req.params.team_id.toString();
    
    if (teamId === null || teamId === undefined) {
        return res.status(400).json({ message: "Invalid Team ID" });
    }

    const team = await Team.findById(teamId);

    if (!Team) {
        res.status(400);
    }

    res.status(200).json(team);
};



const importAllTeamsToBDD = async (req: Request, res: Response) => {
    
     
    var data = await Team.getAllTeams();
    const Team_list = JSON.parse(data);
    
    var result_list = new Array();
    const nb_teams = Object.keys(Team_list.resultSets[0].rowSet).length
    for (let index = 0; index < nb_teams; index++) {
        // extract data from JSON 
        var Team = Team_list.resultSets[0].rowSet[index]
        const id = ""
        const nom =""
        const abbreviation = ""
        const ville = "";
        Team = new Team({id,nom,abbreviation,ville})
        result_list.push(Team)

        Team.save(Team)
    }

    if (!Team_list) {
        res.status(400);
    }

    res.status(200).json(result_list);
};


export { getTeambyID, importAllTeamsToBDD};