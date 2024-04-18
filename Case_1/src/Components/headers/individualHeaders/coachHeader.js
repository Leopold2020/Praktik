import { Link } from "react-router-dom";    
import './header.css'

function coachHeader () {
  return(
      <>
      <ul className="links">
          <li><Link to="">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/coach/homepage">Coach homepage</Link></li>
          <li><Link to="/coach/matches">Personal assignments test</Link></li>
          <li><Link to="/personalassignment">Personal assignments</Link></li>
      </ul>
      </>
  )
}

export default coachHeader;