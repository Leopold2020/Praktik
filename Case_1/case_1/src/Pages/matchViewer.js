import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MatchViewer({axiosJWT}) {
    const [match, setMatch] = useState({
        date: '',
        location: '',
        field: '',
        team1: '',
        team2: ''
    });
    const matchId = useParams();
    
    async function getMatch() {
        const res = await axiosJWT.get(
            `http://localhost:${process.env.REACT_APP_PORT || 5000}/match/get/single/${matchId}`, {
                headers: {
                    authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                },
            }
        );  
        return await res.data;
    }
    
    useEffect(() => {
        getMatch().then((res) => {
            for(let i = 0; i < res.length; i++) {
                res[i].tocall = res[i].tocall.split("T")[0];
            }
            setMatch(res);
        });
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

export default MatchViewer;