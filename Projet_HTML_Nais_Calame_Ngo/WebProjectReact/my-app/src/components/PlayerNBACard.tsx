import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import playerNBAInfo from '../objects/playerNBAInfo';

const colors = {
    ATL: '#E03A3E', // Atlanta Hawks
    BOS: '#007A33', // Boston Celtics
    CLE: '#860038', // Cleveland Cavaliers
    NOP: '#0C2340', // New Orleans Pelicans
    CHI: '#CE1141', // Chicago Bulls
    DAL: '#00538C', // Dallas Mavericks
    DEN: '#0E2240', // Denver Nuggets
    GSW: '#1D428A', // Golden State Warriors
    HOU: '#CE1141', // Houston Rockets
    LAC: '#C8102E', // Los Angeles Clippers
    LAL: '#552583', // Los Angeles Lakers
    MIA: '#98002E', // Miami Heat
    MIL: '#00471B', // Milwaukee Bucks
    MIN: '#0C2340', // Minnesota Timberwolves
    BKN: '#000000', // Brooklyn Nets
    NYK: '#006BB6', // New York Knicks
    ORL: '#0077C0', // Orlando Magic
    IND: '#002D62', // Indiana Pacers
    PHI: '#006BB6', // Philadelphia 76ers
    PHX: '#1D1160', // Phoenix Suns
    POR: '#E03A3E', // Portland Trail Blazers
    SAC: '#5A2D81', // Sacramento Kings
    SAS: '#C4CED4', // San Antonio Spurs
    OKC: '#007AC1', // Oklahoma City Thunder
    TOR: '#CE1141', // Toronto Raptors
    UTA: '#002B5C', // Utah Jazz
    MEM: '#5D76A9', // Memphis Grizzlies
    WAS: '#002B5C', // Washington Wizards
    DET: '#C8102E', // Detroit Pistons
    CHA: '#1D1160' // Charlotte Hornets
};


const PlayerCard = ({ playerinfo, team_abbreviation }: { playerinfo: playerNBAInfo; team_abbreviation: string }) => {

    const teamAbbreviation = team_abbreviation as keyof typeof colors;

    return (
        <Card style={{ backgroundColor: colors[teamAbbreviation] }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                        <img src={`http://cdn.nba.com/headshots/nba/latest/1040x760/${playerinfo?.id}.png`} alt="Avatar" style={{ width: '70%', height: '70%' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h2" style={{ color: '#FFFFFF' }}>{playerinfo?.prenom} {playerinfo?.nom}</Typography>
                        <Typography variant="h4" style={{ color: '#FFFFFF' }}>Age: {playerinfo?.age}</Typography>
                        <Typography variant="h4" style={{ color: '#FFFFFF' }}>Origin: {playerinfo?.country}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} >
                    <Grid key="pts" item xs={3}>
                        <Typography variant="h3" style={{ color: '#FFFFFF' }}>{"PTS"}</Typography>
                        <Typography variant="h4" style={{ color: '#FFFFFF' }}>{playerinfo?.PTS}</Typography>
                    </Grid>
                    <Grid key="ast" item xs={3}>
                        <Typography variant="h3" style={{ color: '#FFFFFF' }}>{"AST"}</Typography>
                        <Typography variant="h4" style={{ color: '#FFFFFF' }}>{playerinfo?.AST}</Typography>
                    </Grid>
                    <Grid key="reb" item xs={3}>
                        <Typography variant="h3" style={{ color: '#FFFFFF' }}>{"REB"}</Typography>
                        <Typography variant="h4" style={{ color: '#FFFFFF' }}>{playerinfo?.REB}</Typography>
                    </Grid>
                    <Grid key="pie" item xs={3}>
                        <Typography variant="h3" style={{ color: '#FFFFFF' }}>{"PIE"}</Typography>
                        <Typography variant="h4" style={{ color: '#FFFFFF' }}>{playerinfo?.PIE}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default PlayerCard;