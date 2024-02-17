import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";

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
                transform: 'translate(30%, -30%)', // Déplacer le badge de moitié vers le haut et la droite
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
    return (
        <CustomBadge content={10}>
            <Card sx={{ backgroundColor: "white", border: "4px solid #ff6a00", height: "20vh", width: "30vh" }}>
                <CardContent sx={{
                    height: "100%", // Utilise 100% de la hauteur disponible
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Cette semaine:
                            </Typography>
                            <ul style={{ fontSize: "1rem", padding: "0", margin: "0", listStyleType: "none" }}>
                                <li>Stat 1</li>
                                <li>Stat 2</li>
                                <li>Stat 3</li>
                                <li>Stat 4</li>
                                <li>Stat 5</li>
                            </ul>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <img
                                src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${joueurId}.png`}
                                alt="Image joueur"
                                style={{ maxWidth: "100%", maxHeight: "100%", marginTop: "12%" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ textAlign: "center" }}>
                                Nom du joueur
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </CustomBadge>
    );
}

export default CarteJoueur;