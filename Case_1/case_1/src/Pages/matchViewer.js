import React, { useState } from "react";
import { useParams } from "react-router-dom";

function MatchViewer() {
    const [match, setMatch] = useState({
        date: '',
        location: '',
        field: '',
        team1: '',
        team2: ''
    });
    const matchId = useParams();


    return (
        <div>
            <h1>Match Viewer</h1>
            {/* <p>{matchId}</p> */}
            <button onClick={e => {console.log(matchId)}}></button>
        </div>
    );
}

export default MatchViewer;