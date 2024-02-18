import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import JoueurStats from "../objects/JoueurStats";
import './CarteJoueur.css'



const CustomBadge = ({ content, children }: { content: any, children: any }) => {
    let number: string;
    if (content < 10) {
        number = "0" + content.toString();
    } else {
        number = content.toString();
    }
    return (
        <div
            style={{
                position: 'relative',
                display: 'inline-block',
            }}
        >
            {children}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    transform: 'translate(30%, -30%)',
                    backgroundColor: '#ff6a00', // Couleur de fond du badge
                    color: 'white', // Couleur du texte du badge
                    borderRadius: '50%', // Bord arrondi pour un aspect de badge
                    padding: '12px 18px', // Espace à l'intérieur du badge
                }}
            >
                {number}
            </div>
        </div>
    );
};


function CarteJoueur({ joueurId }: { joueurId: number }) {

    const [stats, setStats] = useState<JoueurStats>();
    useEffect(() => {
        axiosInstance.get(`/playersNBA/recentstats/${joueurId}`)
            .then(response => {
                console.log(response.data);
                setStats(response.data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const score: number = Math.round(((((stats?.PTS ?? 0) * 1.2) + ((stats?.AST ?? 0) * 1.6) + ((stats?.OREB ?? 0) * 1.2)
        + ((stats?.DREB ?? 0) * 1.1) + ((stats?.BLK ?? 0) * 2) + ((stats?.STL ?? 0) * 2) + ((stats?.FG_PCT ?? 0) * 5.6)
        + ((stats?.PFD ?? 0) * 0.4) - ((stats?.TOV ?? 0) * 1.1) - ((stats?.PF ?? 0) * 0.6) + ((stats?.PLUS_MINUS ?? 0) * 0.5)) / (stats?.GP ?? 0)));


    return (
        // ici mettre le résultat du score du joueur, à l'intérieur du content
        <div className="container-carte">
            <CustomBadge content={score}>
                <Card sx={{ backgroundColor: "white", border: "4px solid #ff6a00", height: "20vh", width: "14vw" }}>
                    <CardContent sx={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    Cette semaine:
                                </Typography>
                                <ul style={{ fontSize: "0.75vw", padding: "0", margin: "0", listStyleType: "none" }}>
                                    <li>{((stats?.PTS ?? 0) / (stats?.GP ?? 0)).toFixed(1)} pts</li>
                                    <li>{((stats?.AST ?? 0) / (stats?.GP ?? 0)).toFixed(1)} pds</li>
                                    <li>{((stats?.REB ?? 0) / (stats?.GP ?? 0)).toFixed(1)} rbs</li>
                                    <li>{((stats?.BLK ?? 0) / (stats?.GP ?? 0)).toFixed(1)} ctr</li>
                                    <li>{((stats?.STL ?? 0) / (stats?.GP ?? 0)).toFixed(1)} int</li>
                                </ul>
                            </Grid>
                            <Grid item xs={12} sm={6} md={8} lg={8}>
                                <img
                                    src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${joueurId}.png`}
                                    alt="Image joueur"
                                    style={{ width: "100%", height: "auto", marginTop: "12%" }}
                                />
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ textAlign: "center", whiteSpace: "nowrap" }}>
                                    {stats?.prenom} {stats?.nom}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </CustomBadge>
        </div>
    );
}

export default CarteJoueur;