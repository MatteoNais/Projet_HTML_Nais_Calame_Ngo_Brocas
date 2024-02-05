import React from 'react';

interface Team {
    id: number;
    full_name: string;
    name: string;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    // Ajoutez d'autres propriétés si nécessaire
}

export default Team;