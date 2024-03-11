import { Link } from "react-router-dom";    
import './header.css'

function refereeHeader () {
  return(
      <>
      <ul className="links">
          <li><Link to="">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/referee/homepage">referee homepage</Link></li>
          <li><Link to="/personalassignment">Personal assignments</Link></li>
      </ul>
      </>
  )
}

export default refereeHeader;