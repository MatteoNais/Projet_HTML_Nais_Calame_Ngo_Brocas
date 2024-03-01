import { Request, Response } from "express";
import Team from "../models/Team";

const importAllTeamsToBDD = async (req: Request, res: Response) => {
    const data = await Team.getAllTeamsNBA()
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
        team = new Team({ id, nom, abbreviation, ville })
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

const getAllTeams = async (req: Request, res: Response) => {

    const teams = await Team.getAllTeams();

    if (!teams) {
        res.status(400);
    }

    res.status(200).json(teams);
};

const getTeamInfo = async (req: Request, res: Response) => {
    const teamId = req.params.team_id.toString();

    const infos = await Team.getTeamInfo(teamId);

    if (!infos) {
        res.status(400);
    }

    res.status(200).json(infos);
};


interface teamNBAinfo {
    id: number;
    nom: string;
    ville: string;
    CONF_RANK: number;
    TEAM_ABBREVIATION: string;
    TEAM_CONFERENCE: string;
    W: number;
    L: number;
    PPG: number;
    PPG_rank: number;
    RPG: number;
    RPG_rank: number;
    APG: number;
    APG_rank: number;
    OPPG: number;
    OPPG_rank: number,

}

const getTeamInfoSimple = async (req: Request, res: Response) => {
    const teamId = req.params.team_id.toString();

    const infos = await Team.getTeamInfo2(teamId);

    if (!infos) {
        res.status(400);
    }

    let data = JSON.parse(infos)

    const commonInfo = data.resultSets[0].rowSet[0];
    const ranks = data.resultSets[1].rowSet[0];

    const teamInfo: teamNBAinfo = {
        id: commonInfo[0],
        nom: commonInfo[3],
        TEAM_ABBREVIATION: commonInfo[4],
        ville: commonInfo[2],
        CONF_RANK: commonInfo[12],
        TEAM_CONFERENCE: commonInfo[5],
        W: commonInfo[9],
        L: commonInfo[10],
        PPG: ranks[4],
        PPG_rank: ranks[3],
        RPG: ranks[6],
        RPG_rank: ranks[5],
        APG: ranks[8],
        APG_rank: ranks[7],
        OPPG: ranks[10],
        OPPG_rank: ranks[9]
    };


    res.status(200).json(teamInfo);
};


const getAllTeamsInfo = async (req: Request, res: Response) => {

    var teams = await Team.getAllTeamInfo()

    if (!teams) {
        res.status(400);
    }

    let data = JSON.parse(teams)

    let teamsInfo: teamNBAinfo[] = [];

    for (let index = 0; index < data.length; index++) {
        const commonInfo = data[index].resultSets[0].rowSet[0];
        const ranks = data[index].resultSets[1].rowSet[0];

        const teamInfo: teamNBAinfo = {
            id: commonInfo[0],
            nom: commonInfo[3],
            ville: commonInfo[2],
            TEAM_ABBREVIATION: commonInfo[4],
            CONF_RANK: commonInfo[12],
            TEAM_CONFERENCE: commonInfo[5],
            W: commonInfo[9],
            L: commonInfo[10],
            PPG: ranks[4],
            PPG_rank: ranks[3],
            RPG: ranks[6],
            RPG_rank: ranks[5],
            APG: ranks[8],
            APG_rank: ranks[7],
            OPPG: ranks[10],
            OPPG_rank: ranks[9]
        };

        teamsInfo.push(teamInfo);
    }


    //let teamsJSON = JSON.stringify(teamsInfo);
    res.status(200).json(teamsInfo);
};


export { getTeambyID, importAllTeamsToBDD, getAllTeamsInfo, getTeamInfoSimple, getAllTeams, getTeamInfo };