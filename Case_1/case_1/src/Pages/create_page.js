import React, { useState } from 'react';
import pic from "../Assets/booff_logo.png";
import "./create_page.css";

function CreatePage({axiosJWT}) {
  const [referee, setReferee] = useState({ name: '', email: '', phone: '', bank_clering: '', bank_number: '' });
  const [match, setMatch] = useState({ date: '', location: '', field: '', team1: '', team2: '' });

  const handleRefereeSubmit = async () => {
    try {
      await axiosJWT.post("http://localhost:5000/referee/add", {
        name: referee.name,
        email: referee.email,
        phone: referee.phone,
        bank_clering: referee.bank_clering,
        bank_number: referee.bank_number
      }, {
        headers: { 
          'Authorization': sessionStorage.getItem('accessToken')
        }
      });

      console.log('Referee added successfully');
    } catch (error) {
      console.error('Error adding referee:', error.message);
    }
  };

  const handleMatchSubmit = async () => {
    try {
      const post = "http://localhost:5000/match/add";
      await fetch(post, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(match),
      });

      console.log('Match added successfully');
    } catch (error) {
      console.error('Error adding match:', error.message);
    }
  };

  return (
    <div>
      <img className="img" src={pic} alt="Referee" />
      <h2>Create Referee</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={referee.name}
            onChange={(e) => setReferee({ ...referee, name: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={referee.email}
            onChange={(e) => setReferee({ ...referee, email: e.target.value })}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            value={referee.phone}
            onChange={(e) => setReferee({ ...referee, phone: e.target.value })}
          />
        </label>
        <label>
          Bank Claring:
          <input
            type="text"
            value={referee.bank_clering}
            onChange={(e) => setReferee({ ...referee, bank_clering: e.target.value })}
          />
        </label>
        <label>
          Bank Number:
          <input
            type="text"
            value={referee.bank_number}
            onChange={(e) => setReferee({ ...referee, bank_number: e.target.value })}
          />
        </label>
        <button type="button" onClick={handleRefereeSubmit}>
          Add Referee
        </button>
      </form>

      <h2>Create Match</h2>
      <form>
        <label>
          Date:
          <input
            type="text"
            value={match.date}
            onChange={(e) => setMatch({ ...match, date: e.target.value })}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={match.location}
            onChange={(e) => setMatch({ ...match, location: e.target.value })}
          />
        </label>
        <label>
          Field:
          <input
            type="text"
            value={match.field}
            onChange={(e) => setMatch({ ...match, field: e.target.value })}
          />
        </label>
        <label>
          Team 1:
          <input
            type="text"
            value={match.team1}
            onChange={(e) => setMatch({ ...match, team1: e.target.value })}
          />
        </label>
        <label>
          Team 2:
          <input
            type="text"
            value={match.team2}
            onChange={(e) => setMatch({ ...match, team2: e.target.value })}
          />
        </label>
        <button type="button" onClick={handleMatchSubmit}>
          Add Match
        </button>
      </form>
    </div>
  );
}

export default CreatePage;
