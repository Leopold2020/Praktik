import { Link } from "react-router-dom";    
import './Header.css'

function Header () {
  return(
      <>
      <ul className="links">
          <li><Link to="">Login</Link></li>
          <li><Link to="create">Create</Link></li>
          <li><Link to="overview">Overview</Link></li>
          <li><Link to="matchoverview">Match Overview</Link></li>
          <li><Link to="assignref">Assign Referee</Link></li>
      </ul>
      </>
  )
}

export default Header;