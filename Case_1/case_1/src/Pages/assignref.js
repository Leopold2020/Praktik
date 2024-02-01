import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './assignref.css'; // Import your CSS file for styling

const AssignRefPage = () => {
  const [matches, setMatches] = useState([]);
  const [referees, setReferees] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState('');
  const [selectedReferee, setSelectedReferee] = useState('');

  useEffect(() => {
    getMatches();
    getReferees();
  }, []);

  const getMatches = async () => {
    try {
      const response = await axios.get("http://localhost:5000/match/get/all", {
        headers: {
          'Authorization': sessionStorage.getItem('accessToken')
        }
      });
      console.log("Matches", response.data);
      setMatches(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getReferees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/referee/get/all", {
        headers: {
          'Authorization': sessionStorage.getItem('accessToken')
        }
      }).then((response) => {
        console.log("Referees", response.data);
        setReferees(response.data);
  
      });

    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAssignment = async () => {
    try {
      // Send the assignment data to your server
      const response = await axios.post("http://localhost:5000/assignment", {
        matchId: selectedMatch,
        refereeId: selectedReferee
      }, {
        headers: {
          'Authorization': sessionStorage.getItem('accessToken')
        }
      });
      console.log(response.data);
      // Handle success or show a confirmation to the user
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="assign-referee-container">
      <h1>Assign Referee to Match</h1>

      <div className="form">
        <label>
          Select Match:
          <select onChange={(e) => setSelectedMatch(e.target.value)}>
            <option value="" disabled>Select a Match</option>
            {matches.map((match) => (
              <option key={match.id} value={match.id}>{match.team_1} vs {match.team_2}</option>
            ))}
          </select>
        </label>

        <label>
          Select Referee:
          <select onChange={(e) => setSelectedReferee(e.target.value)}>
            <option value="" disabled>Select a Referee</option>
            {referees.map((referee) => (
              <option key={referee.id} value={referee.id}>{referee.username}</option>
            ))}
          </select>
        </label>

        <button onClick={handleAssignment}>Assign Referee</button>
      </div>
    </div>
  );
};

export default AssignRefPage;
