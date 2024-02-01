import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Overview = () => {
    const [matches, setMatches] = useState([]);
    const [referees, setReferees] = useState([]);
    
    useEffect(() => {
        getMatches();
       // getReferees();
    }, []);

    const getMatches = async () => {
        try {
            const response = await axios.get("http://localhost:5000/match/get/all", {
                headers: {
                    'Authorization': sessionStorage.getItem('accessToken')
                }
            }).then((res) => {
                console.log("RES", res)
                setMatches(res.data);
            })
        } catch (error) {
            console.error(error.message);
        }
    }

    const getReferees = async () => {
        try {
            const response = await axios.get("http://localhost:5000/referee/get/all", {
                headers: {
                    'Authorization': sessionStorage.getItem('accessToken')
                }
            });
            console.log(response.data);
            setReferees(response.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div>
            <h1>Overview</h1>
            <div>
                <h2>Matches</h2>
                {matches.map((match) => (
                    <div key={match.id}>
                        <h3>{match.team_1} - {match.team_2}</h3>
                        <p>Location: {match.location}</p>
                        <p>Field: {match.field}</p>
                    </div>
                ))}
            </div>

            <div>
                <h2>Referees</h2>
                {referees.map((referee) => (
                    <div key={referee.id}>
                        <h3>{referee.name}</h3>
                        <p>Email: {referee.email}</p>
                        <p>Phone: {referee.phone}</p>
                        {/* Add more details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Overview;
