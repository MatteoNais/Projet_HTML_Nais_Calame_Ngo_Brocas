import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Calendar.css'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Match from '../objects/Match';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
}));

async function getMatchs(teamId: string): Promise<Match[]> {
    const options = {
        method: 'GET',
        url: 'https://www.balldontlie.io/api/v1/games',
        params: {
            team_ids: [teamId],
            page: '0',
            per_page: '30'
        },
    };
    try {
        const response = await axios.request(options);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

function Calendar({ teamId }: { teamId: string }) {
    const [matchs, setMatchs] = useState<Match[]>([]);

    useEffect(() => {
        async function fetchData() {
            const matchsData = await getMatchs(teamId);
            setMatchs(matchsData);
        }
        fetchData();
    }, []);



    const DisplayData = matchs.map((match) => (
        <div key={match.date} className="result-item">
            <Box sx={{ width: 200 }}>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                    <Item>{match.home_team.name} </Item>
                    <Item> {match.home_team_score} - {match.visitor_team_score} </Item>
                    <Item>{match.visitor_team.name}</Item>
                    <Item>Date : {match.date}</Item>
                </Stack>
            </Box>
        </div>
    ));
    if (!teamId) {
        // Gérer le cas où teamId est undefined
        return <div>Équipe non spécifiée</div>;
    }
    return (
        <div className="results-list">{DisplayData}
            <div>
            </div>
        </div>


    )
}

export default Calendar;
