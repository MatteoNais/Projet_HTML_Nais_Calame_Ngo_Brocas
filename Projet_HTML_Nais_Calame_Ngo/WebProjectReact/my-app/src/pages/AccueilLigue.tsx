import React from 'react';
import './StylePages.css'
import { useParams } from 'react-router-dom';

interface Params {
    [ligueId: string]: string | undefined;
}

function AccueilLigue() {
    const { ligueId } = useParams<Params>();
    if (ligueId) {
        return (
            <div className="body">
                <body className='App-body'>
                    <h1> Page Accueil Ligue</h1>
                    <p> Id de la ligue : {ligueId}</p>
                    {/* <Calendar teamId={teamId}></Calendar> */}
                </body>
            </div>
        );
    }
    else {
        return (
            <h1> pas de ligue de spécifier </h1>
        );
    }
}

export default AccueilLigue;