import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MatchOverview({axiosJWT}) {
    const [match, setMatch] = useState([]);
    const navigate = useNavigate();

    const getAllMatches = async () => {
        try {
            await axiosJWT.get("http://localhost:5000/match/get/all", {
                headers: {
                    'Authorization': sessionStorage.getItem('accessToken')
                }
            }).then((response) => {
                switch (response.status) {
                    case 200:
                        setMatch(response.data);
                        break;
                    case undefined:
                        alert("You need to login first");
                        break;
                    default:
                        alert("Something went wrong");
                        break;
                }
            });
        } catch (error) {
            alert("You need to login")
        }
    }

    useEffect(() => {
        getAllMatches();
    }, []);

    return (
        <div>
            <h1>Match Overview</h1>
            {match.map((match) => (
                <div key={match.id}>
                    <a href={`/matchviewer/${match.id}`}>{match.team_1} vs {match.team_2}</a>
                    <p>{match.date}</p>
                    <p>{match.location}</p>
                    <p>{match.field}</p>
                </div>
            ))}
        </div>
    );
}

export default MatchOverview;