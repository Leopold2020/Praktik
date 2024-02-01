import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MatchViewer({axiosJWT}) {
    const [match, setMatch] = useState({
        date: '',
        location: '',
        field: '',
        team_1: '',
        team_2: ''
    });
    const matchId = useParams();
    
    async function getMatch() {
        console.log(matchId.matchId)
        const res = await axiosJWT.get(
            `http://localhost:${process.env.REACT_APP_PORT || 5000}/match/get/single/${matchId.matchId}`, {
                headers: {
                    authorization: `${sessionStorage.getItem("accessToken")}`
                },
            }
        )
        return await res.data;
    }
    
    useEffect(() => {
        getMatch().then((res) => {
            // for(let i = 0; i < res.length; i++) {
            //     res[i].date = res[i].date.split("T")[0];
            // }
            
            res.date= res.date.split("T")[0];
            setMatch(res);
        });
    }, []);
    
    console.log(match)

    return (
        <div>
            <h1>Match Overview</h1>
                <div>
                    <a>{match.team_1} vs {match.team_2}</a>
                    <p>{match.date}</p>
                    <p>{match.location}</p>
                    <p>{match.field}</p>
                </div>
        </div>
    );
}

export default MatchViewer;