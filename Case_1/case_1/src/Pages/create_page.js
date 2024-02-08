import React, { useState } from 'react';
import booff_logo from "../Assets/booff_logo.png";
import "./create_page.css";

function CreatePage({axiosJWT}) {
  const [referee, setReferee] = useState({ name: '', email: '', phone: '', bank_clering: '', bank_number: '' });
  const [match, setMatch] = useState({ date: '', location: '', field: '', team1: '', team2: '' });
  const [arrow_ref, setArrowRef] = useState('↓');
  const [arrow_match, setArrowMatch] = useState('↓');

  const [showRefereeFields, setShowRefereeFields] = useState(false);
  const [showMatchFields, setShowMatchFields] = useState(false);

  /*
  * Function to handle the creation of a referee
  *
  * @param {string} name - the name of the referee
  * @param {string} email - the email of the referee
  * @param {string} phone - the phone number of the referee
  * @param {string} bank_clering - the bank clearing number of the referee
  * @param {string} bank_number - the bank account number of the referee
  * @return - the referee is added to the database
  * @throws - if the referee is not added
  */
  const handleRefereeSubmit = async () => {
    try {
      await axiosJWT.post(`http://localhost:${process.env.REACT_APP_PORT || 5000}/referee/add`, {
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

  /*
  * Function to handle the creation of a match
  *
  * @param {string} date - the date of the match, both date and time
  * @param {string} location - the location of the match
  * @param {string} field - the field of the match
  * @param {string} team1 - the first team in the match
  * @param {string} team2 - the second team in the match
  * @return - the match is added to the database
  * @throws - if the match is not added
  */
  const handleMatchSubmit = async () => {
    try {
      await axiosJWT.post(`http://localhost:${process.env.REACT_APP_PORT || 5000}/match/add`, {
        date: match.date,
        location: match.location,
        field: match.field,
        team_1: match.team1,
        team_2: match.team2
      }, {
        headers: {
          'Authorization': sessionStorage.getItem('accessToken')
        }
      }).then((response) => {
        if (response.status === 200) {
          console.log('Match added successfully');
        }
      })

    } catch (error) {
      console.error('Error adding match:', error.message);
    }
  };

  const toggleRefereeFields = () => {
    setShowRefereeFields(!showRefereeFields);
    setArrowRef(arrow_ref === '↓' ? '↑' : '↓');
  };

  const toggleMatchFields = () => {
    setShowMatchFields(!showMatchFields);
    setArrowMatch(arrow_match === '↓' ? '↑' : '↓');
  };

  return (
    <div className='create-div'>
      <img className="img" src={booff_logo} alt="Referee" />
      <h2 onClick={toggleRefereeFields}>Create Referee {arrow_ref}</h2>
      {showRefereeFields && (
      <form className='create-form'>
        <label className='create-label'>
          Name:
          <input
            type="text"
            className='create-input'
            value={referee.name}
            onChange={(e) => setReferee({ ...referee, name: e.target.value })}
          />
        </label>
        <label className='create-label'>
          Email:
          <input
            type="text"
            className='create-input'
            value={referee.email}
            onChange={(e) => setReferee({ ...referee, email: e.target.value })}
          />
        </label>
        <label className='create-label'>
          Phone:
          <input
            type="text"
            className='create-input'
            value={referee.phone}
            onChange={(e) => setReferee({ ...referee, phone: e.target.value })}
          />
        </label>
        <label className='create-label'>
          Bank Clearing:
          <input
            type="text"
            className='create-input'
            value={referee.bank_clering}
            onChange={(e) => setReferee({ ...referee, bank_clering: e.target.value })}
          />
        </label>
        <label className='create-label'>
          Bank Number:
          <input
            type="text"
            className='create-input'
            value={referee.bank_number}
            onChange={(e) => setReferee({ ...referee, bank_number: e.target.value })}
          />
        </label>
        <button
          type="button"
          className='create-button'
          onClick={handleRefereeSubmit}
        >
          Add Referee
        </button>
      </form>
      )}
      <h2 onClick={toggleMatchFields}>Create Match {arrow_match}</h2>
      {showMatchFields && (
      <form className='create-form'>
        <label className='create-label'>
          Date:
          <input
            type="text"
            className='create-input'
            value={match.date}
            onChange={(e) => setMatch({ ...match, date: e.target.value })}
          />
        </label>
        <label className='create-label'>
          Location:
          <input
            type="text"
            className='create-input'
            value={match.location}
            onChange={(e) => setMatch({ ...match, location: e.target.value })}
          />
        </label>
        <label className='create-label'>
          Field:
          <input
            type="text"
            className='create-input'
            value={match.field}
            onChange={(e) => setMatch({ ...match, field: e.target.value })}
          />
        </label>
        <label className='create-label'>
          Team 1:
          <input
            type="text"
            className='create-input'
            value={match.team1}
            onChange={(e) => setMatch({ ...match, team1: e.target.value })}
          />
        </label>
        <label className='create-label'>
          Team 2:
          <input
            type="text"
            className='create-input'
            value={match.team2}
            onChange={(e) => setMatch({ ...match, team2: e.target.value })}
          />
        </label>
        <button 
          type="button"
          className='create-button'
          onClick={handleMatchSubmit}
        >
          Add Match
        </button>
      </form>
      )}
    </div>
  );
}

export default CreatePage;
