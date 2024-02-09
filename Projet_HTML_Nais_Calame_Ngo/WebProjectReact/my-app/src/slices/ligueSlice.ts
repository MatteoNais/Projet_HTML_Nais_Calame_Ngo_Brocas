import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export interface Ligue {
    id: string;
    nom: string;
    code_access: string;
    date_creation: string;
};

type CreateLigue = {
    nom: string;
    userId: string;
}

type InscriptionData = {
    code_access: string;
    userId: string;
}

type LigueApiState = {
    ligue: Ligue[];
    status: "idle" | "loading" | "failed";
    error: string | null;
    selectedLigue: Ligue | null; // pour passer la ligue sélectionné vers la page ligue

}

const initialState: LigueApiState = {
    ligue: localStorage.getItem("ligueInfo")
        ? JSON.parse(localStorage.getItem("ligueInfo") as string)
        : null,
    status: "idle",
    error: null,
    selectedLigue: null,
};


export const create = createAsyncThunk("create", async (data: CreateLigue) => {
    const response = await axiosInstance.post(
        "/ligues/create",
        data
    );
    return response.data;
});

export const getMyLigues = createAsyncThunk("getMyLigues", async (id_user: string) => {
    const response = await axiosInstance.get(
        `/ligues/id_user/${id_user}`
    );
    return response.data;
});

export const inscriptionLigue = createAsyncThunk("inscriptionLigue", async (data: InscriptionData) => {
    console.log("appelling");
    const response = await axiosInstance.post(
        "/ligues/inscription_ligue",
        data
    );
    console.log(response);
});


const ligueSlice = createSlice({
    name: "ligue",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(create.fulfilled, (state, action) => {
            // Gérer la réussite de la requête
            // Vous pouvez mettre à jour l'état du slice si nécessaire
        });
        builder.addCase(create.rejected, (state, action) => {
            // Gérer les erreurs de la requête
            console.error("Erreur lors de la création de la ligue :", action.payload);
        });
        builder.addCase(getMyLigues.fulfilled, (state, action) => {
            state.status = "idle";
            state.ligue = action.payload;
        });
        builder.addCase(getMyLigues.rejected, (state, action) => {
            // Gérer les erreurs de la requête
            console.error("Erreur lors du chargement des ligues :", action.payload);
        });
        builder.addCase(getMyLigues.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(inscriptionLigue.fulfilled, (state, action) => {
            //Gérer la réusssite de la création
        });
        builder.addCase(inscriptionLigue.rejected, (state, action) => {
            // Gérer les erreurs de la création
            console.error("Erreur lors de l'inscription à la ligue :", action.payload);
        });
    },
});


export default ligueSlice.reducer;