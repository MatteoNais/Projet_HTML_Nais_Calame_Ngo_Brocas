
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './pages/Header';
import Home from './pages/Home';
import Resultat from './pages/Resultat';
import Team from './pages/Team';
import SignInSide from './pages/SignIn';
import SignUpSide from './pages/SignUp';
import store from './store';
import { Provider } from 'react-redux';
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import MesLigues from './pages/MesLigues';
import AccueilLigue from './pages/AccueilLigue';
export default function App() {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path="/login" element={<SignInSide />} />
                <Route path="/register" element={<SignUpSide />} />
            </Route>
            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Header />}>
                    <Route index element={<MesLigues />} />
                    <Route path="resultats" element={<Resultat />} />
                    <Route path="ligues" element={<MesLigues />} />
                    <Route
                        path="team/:teamId"
                        element={<Team />}
                    />
                    <Route
                        path="ligue/:ligueId"
                        element={<AccueilLigue />}
                    />
                </Route>
            </Route>
        </Routes>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
