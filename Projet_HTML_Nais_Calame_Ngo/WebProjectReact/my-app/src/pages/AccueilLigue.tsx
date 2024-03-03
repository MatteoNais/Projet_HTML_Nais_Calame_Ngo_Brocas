import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import Classement from '../components/Classement';
import './StylePages.css';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axiosInstance from '../api/axiosInstance';
import { useParams } from 'react-router';
import Draft from '../objects/Draft';

interface Params {
    [ligueId: string]: string | undefined;
}
function AccueilLigue() {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());
    const options = ['Bleu', 'Rouge', 'Vert', 'Jaune', 'Orange'];
    const { ligueId } = useParams<Params>();
    const [currentDraft, setCurrentDraft] = useState<Draft>();

    const theme = createTheme({
        palette: {
            primary: { main: "#E36414" }
        }
    });

    useEffect(() => {
        axiosInstance.get(`/draft/ligue/${ligueId}`)
            .then(response => {
                console.log(response.data);
                setCurrentDraft(response.data);
                console.log(dayjs());

            })
            .catch(error => console.error('Error:', error));
    }, [ligueId]);

    useEffect(() => {
        axiosInstance.put(`/equipe/updateScore/${ligueId}`)
            .then(response => {
                console.log(" test put" + response.data);
            })
    }, []);

    async function createDraft(id_ligue: string) {
        console.log(value?.format("YYYY-MM-DD HH:mm:ss"));
        try {
            if (value) {
                const formatteddate = value?.format("YYYY-MM-DD HH:mm:ss");
                const data = { ligueId: id_ligue, date_debut: formatteddate };
                const response = await axiosInstance.post(`/draft/create`, data);
                console.log(response.data);
            }

        } catch (error) {
            console.error("Error creating draft:", error);
        } finally {
            // Réactualiser la page
            // window.location.reload();
            openModal();
        }
    }

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="body">
            <div className='App-body-ligue'>
                {showModal && (
                    <div className="modal-container">
                        <div className="modal">
                            {/* Contenu de la fenêtre modale */}
                            <h2> La draft a bien été créé </h2>
                            {/* Bouton pour fermer la fenêtre modale */}
                            <Button variant="contained" disableElevation onClick={closeModal}> Fermer</Button>

                        </div>
                    </div>
                )}
                <Grid container spacing={3} sx={{ marginTop: '10vh' }}>
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
                        {currentDraft?.id_draft ? (<Classement idDraft={currentDraft?.id_draft} />) : (<Classement idDraft={0} />)}
                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginLeft: '10px', marginRight: '10px' }}>
                            {currentDraft?.date_fin && dayjs(currentDraft.date_fin).isAfter(dayjs()) ? (
                                <>

                                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} sx={{
                                        backgroundColor: 'grey',
                                        border: '2px solid #ff6a00',
                                        padding: '10px',
                                    }}>
                                        <Typography variant="h5" sx={{ color: 'white' }}> La draft est actuellement en cours.</Typography>
                                        <Typography variant="h5" sx={{ color: 'white' }}>{dayjs(currentDraft?.date_debut)?.format("YYYY-MM-DD HH:mm")} - {dayjs(currentDraft?.date_fin)?.format("YYYY-MM-DD HH:mm")}</Typography>
                                    </Box>
                                </>
                            ) : (

                                <>
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
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        style={{ width: 'fit-content', marginLeft: '20px' }}
                                        onClick={() => createDraft(ligueId || '')}
                                    >
                                        <Typography variant="h5" sx={{ color: 'white' }}>Démarrer la draft</Typography>
                                    </Button>
                                </>
                            )}
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