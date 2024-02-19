import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import playerNBAstats from '../objects/playerNBAInfo';



const PlayerCard = ( {equipe_id}: {equipe_id: number} ) => {
    var [teaminfo, setPlayerInfo] = useState<playerNBAstats>();; 

    useEffect(() => {
        getTeamInfo(equipe_id)
    }, []);
    

    async function getTeamInfo(id:number) {
        axiosInstance.get(`/teamsNBA/info/${id}`) // Remplacez par l'URL de votre API
            .then(response => {
                setPlayerInfo(response.data);
            })
            .catch(error => console.error('Error:', error));
    }
   
    return (
        <Card sx={{ minWidth: 275, margin: '10px' }}>
        <CardContent>
            <Typography variant="h5" component="div">
            {teaminfo?.nom}
            </Typography>
        </CardContent>
        </Card>
    );
};

export default PlayerCard;