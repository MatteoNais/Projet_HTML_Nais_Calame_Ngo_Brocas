import React, { useState } from 'react';
import { Box, Button, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import Classement from '../components/Classement';
import './StylePages.css';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function AccueilLigue() {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());
    const options = ['Bleu', 'Rouge', 'Vert', 'Jaune', 'Orange'];

    const theme = createTheme({
        palette: {
            primary: { main: "#E36414" }
        }
    });

    return (
        <div className="body">
            <div className='App-body-ligue'>
                <Grid container spacing={3} sx={{ marginTop: '2vh' }}>
                    <Grid item xs={6}>
                        {/* Colonne de gauche */}
                        <Grid item xs={12}>
                            {/* Joueur on fire */}
                        </Grid>
                        <Grid item xs={12}>
                            {/* Resultat des match NBA */}
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        {/* Classement des joueurs avec recap des points */}
                        <Classement></Classement>
                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginLeft: '10px', marginRight: '10px' }}>
                            <ThemeProvider theme={theme}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr" >
                                    <DateTimePicker
                                        label="Date de la première draft"
                                        value={value}
                                        onChange={(newValue: Dayjs | null) => setValue(newValue)} selectedSections={undefined} onSelectedSectionsChange={undefined}
                                        sx={{
                                            "input": { color: "white" }, "fieldSet": { borderColor: "white" }, "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "white", // Change this to your desired color on hover
                                            }, "label": { color: "white" }, "button *": { color: "warning.main" }
                                        }}
                                        slotProps={{
                                            textField: {
                                                color: "warning"
                                            }
                                        }} />

                                </LocalizationProvider>
                            </ThemeProvider>
                            <Button variant="contained" color="warning" style={{ width: 'fit-content', marginLeft: '20px' }}>
                                <Typography variant="h5" sx={{ color: 'white' }}>Démarrer la draft</Typography>
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        {/* Line that takes 15% of the space */}

                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default AccueilLigue;