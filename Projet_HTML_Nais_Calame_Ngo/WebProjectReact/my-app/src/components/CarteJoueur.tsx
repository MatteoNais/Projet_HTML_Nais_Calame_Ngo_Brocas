import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import JoueurStats from "../objects/JoueurStats";




const CustomBadge = ({ content, children }: { content: any, children: any }) => (
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
                fontSize: '2rem', // Taille du texte
            }}
        >
            {content}
        </div>
    </div>
);

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

    return (
        // ici mettre le résultat du score du joueur, à l'intérieur du content
        <CustomBadge content={10}>
            <Card sx={{ backgroundColor: "white", border: "4px solid #ff6a00", height: "20vh", width: "30vh" }}>
                <CardContent sx={{ height: "100%" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Cette semaine:
                            </Typography>
                            <ul style={{ fontSize: "1rem", padding: "0", margin: "0", listStyleType: "none" }}>
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
    );
}

export default CarteJoueur;