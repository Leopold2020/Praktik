
function Referees({referees}) {
  return (
    <div className="column">
          {/* <h1>Referees</h1> */}
          {referees !== null ? (
          <table className='table'>
          <tbody>
            <tr>
              {/* <td>Referee ID</td> */}
              <td>Name:</td>
              <td>Email:</td>
              <td>Phone:</td>
              <td>Bank number:</td>
              <td>Bank clearing:</td>
            </tr>
          { referees !== null ? ( referees.map((referee) => (
            <tr key={referee.id} className="card">
              {/* <td>{referee.id}</td> */}
              <td>{referee.username}</td>
              <td>{referee.email}</td>
              <td>{referee.phone}</td>
              <td>{referee.bank_number || "N/A"}</td>
              <td>{referee.bank_clering || "N/A"}</td>
            </tr>
          ))
          ):null}
          </tbody>
          </table>
          ):<h3>No referees found</h3>}
      </div>
  );
}

export default Referees;