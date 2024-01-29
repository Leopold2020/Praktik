import React, { useState } from 'react';
import "./create_page.css";
function CreatePage() {
  const [referee, setReferee] = useState({ name: '', age: '', contactInfo: '' });
  const [match, setMatch] = useState({ field: '', date: '' });

  const handleRefereeSubmit = async () => {
    try {
        // POST TO SQL

      console.log('Referee added successfully');
    } catch (error) {
      console.error('Error adding referee:', error.message);
    }
  };

  const handleMatchSubmit = async () => {
    try {
        // POST TO SQL
      console.log('Match added successfully');
    } catch (error) {
      console.error('Error adding match:', error.message);
    }
  };

  return (
    <div>
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
          Age:
          <input
            type="text"
            value={referee.age}
            onChange={(e) => setReferee({ ...referee, age: e.target.value })}
          />
        </label>
        <label>
          Contact Info:
          <input
            type="text"
            value={referee.contactInfo}
            onChange={(e) => setReferee({ ...referee, contactInfo: e.target.value })}
          />
        </label>
        <button type="button" onClick={handleRefereeSubmit}>
          Add Referee
        </button>
      </form>

      <h2>Create Match</h2>
      <form>
        <label>
          Location:
          <input
            type="text"
            value={match.field}
            onChange={(e) => setMatch({ ...match, field: e.target.value })}
          />
        </label>
        <label>
          Date:
          <input
            type="text"
            value={match.date}
            onChange={(e) => setMatch({ ...match, date: e.target.value })}
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
