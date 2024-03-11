import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./coachMatchReview.css";

function MatchReview({axiosJWT}) {
    const [match, setMatch] = useState({
        date: '',
        location: '',
        field: '',
        team_1: '',
        team_2: ''
    });
    const [referees, setReferees] = useState([]);
    const [coach, setCoach] = useState([]);
    const matchId = useParams();

    async function getMatch() {
        try {
        const res = await axiosJWT.get(
            `http://localhost:${process.env.REACT_APP_PORT || 5000}/match/get/single/${matchId.matchId}`, {
                headers: {
                    authorization: `${sessionStorage.getItem("accessToken")}`
                },
            }
        )
        setMatch(res.data[0]);
        } catch (error) {
            console.log(error.message);
        }
    };

    async function getAssignment() {
        try {
            await axiosJWT.get(`http://localhost:${process.env.REACT_APP_PORT || 5000}/assignment/get/match/${matchId.matchId}`, {
                headers: {
                    authorization: `${sessionStorage.getItem("accessToken")}`
                }
            }).then((res) => {
                setReferees(res.data.refereeList);
                setCoach(res.data.coachList);
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    function handleReferee(id) {
        console.log(id);
    }

    useEffect(() => {
        getMatch();
        getAssignment();
    }, []);

    
    return (
        <div>
            <h1>Match Review</h1>
            <div className="match-form">
                <div className="match-form_2">
                    <a className="match-link_2">{match.team_1} vs {match.team_2}</a>
                    <p className="match-date_2">{match.date}</p>
                    <p className="match-location_2">{match.location}</p>
                    <p className="match-field_2">{match.field}</p>
                </div>
            </div>

            <h2>Referees</h2>
            <table className="coachTable">
                <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                    </tr>
                    {referees.map((referee) => (
                        <tr key={referee.id}>
                            <td>{referee.firstname}</td>
                            <td>{referee.lastname}</td>
                            <td>
                                <button onClick={() => handleReferee(referee.id)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Coaches</h2>
            <table className="coachTable">
                <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                    </tr>
                    {coach.map((coach) => (
                        <tr key={coach.id}>
                            <td>{coach.firstname}</td>
                            <td>{coach.lastname}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default MatchReview;