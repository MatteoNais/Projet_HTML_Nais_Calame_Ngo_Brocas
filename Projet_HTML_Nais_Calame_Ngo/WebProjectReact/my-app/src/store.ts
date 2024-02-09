import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import ligueReducer from "./slices/ligueSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        ligueArray: ligueReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;