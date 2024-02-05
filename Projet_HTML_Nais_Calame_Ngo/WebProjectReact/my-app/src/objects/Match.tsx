import React from 'react';
import Team from './Team'


interface Match {
    date: string;
    home_team_score: number;
    visitor_team_score: number;
    season: string;
    home_team: Team;
    visitor_team: Team;
}

export default Match;
