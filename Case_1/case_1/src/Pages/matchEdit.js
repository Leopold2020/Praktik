import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MatchEdit({axiosJWT}) {
  const [Match, setMatch] = useState({});
  const matchId = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const location = data.get("location");
    const date = data.get("date");
    const field = data.get("field");
    const TEAM_1 = data.get("TEAM_1");
    const TEAM_2 = data.get("TEAM_1");
    await axiosJWT.post(`http://localhost:${process.env.REACT_APP_PORT || 5000}/match/update`, {
      date: date, 
      location: location, 
      field: field, 
      team_1: TEAM_1, 
      team_2: TEAM_2
    }, {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("Unauthorized");
      }
      if (res.status === 403) {
        alert("Forbidden");
      }
      if (res === undefined) {
        alert("You need to login first");
      }
      if (res.status === 200) {
        alert("Match updated");
      }
    });
  };

  const getMatch = async () => {

    console.log(matchId.matchId)
    return await axiosJWT.get(
        `http://localhost:${process.env.REACT_APP_PORT || 5000}/match/get/single/${matchId.matchId}`,
      {
        headers: { 
            'Authorization': sessionStorage.getItem('accessToken')
        }
      }
    ).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
      if (res.status === 401) {
        alert("Unauthorized");
        return [];
      }
      if (res.status === 403) {
        alert("Forbidden");
        return [];
      }
      
      }
    )
  };

  useEffect(() => {
    getMatch().then((res) => {
      setMatch(res)
      console.log(res)
    });
  }, []);

//   console.log(Match)

  return (
    <>
      <button className="back-but">
        <a className="back-but-text" href={`/overview`}>Go back</a>
      </button>
      {Match !== undefined ? (
      <form className="create-form" onSubmit={handleSubmit}>
        <label className="create-titles">
           Match location:
          <input
            className="create-match"
            type="text"
            name="Match"
            defaultValue={Match.location}
          />
        </label>
        <label className="create-titles">
          Date:
          <input
            className="create-date"
            type="date"
            name="date"
            defaultValue={Match.date}
          />
        </label>
        <label className="create-titles">
          Field:
          <input
            className="field"
            type="text"
            name="field"
            defaultValue={Match.field}
          />
        </label>
        Team 1:
          <input
            className="Team_1"
            type="text"
            name="Team 1"
            defaultValue={Match.team_1}
          />
        <label className="create-titles">
            Team 2:
            <input
                className="Team_2"
                type="text"
                name="Team 2"
                defaultValue={Match.team_2}
                />
            </label>
            <input className="submit-button" type="submit" value="Submit" />
        </form>
      ) : <a className="detail-title">You need to login</a> }
    </>
  );
}

export default MatchEdit;
