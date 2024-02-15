
function Admins({admins}) {
  return (
    <div className='column'>
          {/* <h1>admins</h1> */}
          {admins != null ? (
            <table className='table'>
              <tbody>
              <tr>
                <td>Name:</td>
                <td>Email:</td>
                <td>Phone:</td>
              </tr>
              {admins.map((admin) => (
                <tr key={admin.id} className="card">
                  <td>{admin.username}</td>
                  <td>{admin.email}</td>
                  <td>{admin.phone}</td>
                </tr>
              ))}
              </tbody>
            </table>
          ):<h3>No admins found</h3>}
    </div>
  );
}

export default Admins;