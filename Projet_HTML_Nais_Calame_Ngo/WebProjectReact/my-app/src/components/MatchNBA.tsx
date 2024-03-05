import React from "react";
import Match_du_jour from "../objects/Match_du_jour";


function ListeMatchNBA(){

     /*const [date, setDate] = useState<string>('February 28, 2024'); // Initial date
    const [matches, setMatches] = useState<Match_du_jour[]>([]); // Initial empty matches

   const fetchMatches = (selectedDate: string) => {
        // Mock API call or data fetching logic goes here
        const mockMatches: Match_du_jour[] = [
          { id: 1, homeTeam: 'Team A', awayTeam: 'Team B', homeScore: 105, awayScore: 100 },
          // Add more mock matches data
        ];
        setMatches(mockMatches);
    };*/


    const handlePrevDate = () => {
        // Logic to handle previous date
    };
    
    const handleNextDate = () => {
        // Logic to handle next date
    };

    return (
    <div className="container">
        <div className="title">Match NBA</div>
        <div className="date-container"></div>
        <button className="button" onClick={handlePrevDate}>&lt;</button>

        <button className="button" onClick={handleNextDate}>&gt;</button>
    </div>);
    }
export default ListeMatchNBA;