import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './overview.css'; // Import your CSS file for styling
import MatchSearch from '../Components/matchSearch';

function Overview({axiosJWT}) {
  const [matches, setMatches] = useState([]);
  const [referees, setReferees] = useState([]);

  /*
  * Fetch all matches from the server
  * 
  * @throws {error} - if the request is unsuccessful
  */
  const getMatches = async () => {
    try {
      const response = await axiosJWT.get(`http://localhost:${process.env.REACT_APP_PORT || 5000}/match/get/all`, {
        headers: {
          'Authorization': sessionStorage.getItem('accessToken')
        }
      });
      console.log("RES", response);
      setMatches(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getReferees = async () => {
    try {
      const response = await axiosJWT.get(`http://localhost:${process.env.REACT_APP_PORT || 5000}/referee/get/all`, {
        headers: {
          'Authorization': sessionStorage.getItem('accessToken')
        }
      });
      console.log(response.data);
      setReferees(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getMatches();
    getReferees();
  }, []);

  return (
    <div className="overview-container">
      <div className="column">
        <h1>Matches</h1>
        {/* <MatchSearch props={{setMatches, axiosJWT}}/> */}
        {matches.map((match) => (
          <div key={match.id} className="card">
            <h3>{match.team_1} - {match.team_2}</h3>
            <p>Location: {match.location}</p>
            <p>Field: {match.field}</p>
            <p>Date: {match.date} {match.time}</p>
          </div>
        ))}
      </div>

      <div className="column">
        <h1>Referees</h1>
        {referees.map((referee) => (
          <div key={referee.id} className="card">
            <p>Referee ID: {referee.id}</p>
            <h3>Name: {referee.username}</h3>
            <p>Email: {referee.email}</p>
            <p>Phone: {referee.phone}</p>
            <p>Bank clearing: {referee.bank_clering}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
