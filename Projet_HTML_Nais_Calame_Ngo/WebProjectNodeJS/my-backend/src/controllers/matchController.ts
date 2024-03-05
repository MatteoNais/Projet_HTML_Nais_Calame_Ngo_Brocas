import { Request, Response } from "express";
import Match from "../models/Match";


const getAllMatchbyDate = async (req: Request, res: Response) => {
    const matches_date = req.params.date_of_matches.toString();

    const infos = await Match.getAllMatchbyDate(matches_date);

    if (!infos) {
        res.status(400);
    }

    res.status(200).json(infos);
};


export {getAllMatchbyDate};