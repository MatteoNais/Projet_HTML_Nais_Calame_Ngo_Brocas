import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import playerNBAstats from '../objects/playerNBAInfo';



const PlayerCard = ( {player_id}: {player_id: number} ) => {
    var [playerinfo, setPlayerInfo] = useState<playerNBAstats>();; 

    useEffect(() => {
        getplayerInfo(player_id)
    }, []);
    

    async function getplayerInfo(id:number) {
        axiosInstance.get(`/playersNBA/info/${id}`) // Remplacez par l'URL de votre API
            .then(response => {
                setPlayerInfo(response.data);
            })
            .catch(error => console.error('Error:', error));
    }
   
    return (
        <Card sx={{ minWidth: 275, margin: '10px' }}>
        <CardContent>
            <Typography variant="h5" component="div">
            {playerinfo?.nom}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {playerinfo?.position} - {playerinfo?.equipeNBA_id}
            </Typography>
            <Grid container spacing={2}>
            <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                Points par match:
                </Typography>
                <Typography variant="body1">
                8
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                Passes décisives par match:
                </Typography>
                <Typography variant="body1">
                12
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                Rebonds par match:
                </Typography>
                <Typography variant="body1">
                86
                </Typography>
            </Grid>
            </Grid>
        </CardContent>
        </Card>
    );
};

export default PlayerCard;