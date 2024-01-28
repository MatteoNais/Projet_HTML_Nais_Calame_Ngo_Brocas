import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './TeamTable.css'
import { Link } from 'react-router-dom';

interface Team {
    id: number;
    full_name: string;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    // Ajoutez d'autres propriétés si nécessaire
}

async function GetTeams(): Promise<Team[]> {
    const options = {
        method: 'GET',
        url: 'https://www.balldontlie.io/api/v1/teams',
        params: {
            page: '0',
            per_page: '30'
        },
    };
    try {
        const response = await axios.request(options);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}



function Team_table() {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        async function fetchData() {
            const teamsData = await GetTeams();
            setTeams(teamsData);
        }

        fetchData();
    }, []);

    const DisplayData = teams.map((team) => (
        <Link to={`/team/${team.id}`} className="team-card" key={team.id}>
            <img src={require(`../img/teams/${team.abbreviation}.png`)} alt={team.abbreviation} />
            <div className="team-details">
                <h1 className='team-name'><strong>{team.full_name}</strong></h1>
            </div>
        </Link>
    ));

    return (
        <div className="team-container">{DisplayData}</div>
    )
}

export default Team_table;