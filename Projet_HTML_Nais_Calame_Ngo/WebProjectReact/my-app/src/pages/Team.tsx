import React from 'react';
import './StylePages.css'
import { useParams } from 'react-router-dom';
import Calendar from '../components/Calendar';

interface Params {
    [teamId: string]: string | undefined;
}

function Team() {
    const { teamId } = useParams<Params>();
    if (teamId) {
        return (
            <div className="body">
                <body className='App-body'>
                    <h1> Page des Teams</h1>
                    <p> Id de l'équipe : {teamId}</p>
                    <Calendar teamId={teamId}></Calendar>
                </body>
            </div>
        );
    }
    else {
        return (
            <h1> pas d'équipe de spécifier </h1>
        );
    }
}

export default Team;