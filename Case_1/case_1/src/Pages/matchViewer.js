import { func } from "prop-types";
import React, { useState } from "react";
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
            `http://localhost:${process.env.REACT_APP_PORT || 5000}/matchget`, {
                headers: {
                    authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                },
            }
        );  
        return await res.data;
    }
        
    


    return (
        <div>
            <h1>Match Viewer</h1>
            {/* <p>{matchId}</p> */}
            <button onClick={e => {console.log(matchId)}}></button>
        </div>
    );
}

export default MatchViewer;