import { Link } from "react-router-dom";    
import './header.css'

function Header () {
  return(
      <>
      <ul className="links">
          <li><Link to="">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/create">Create</Link></li>
          <li><Link to="/overview">Overview</Link></li>
          <li><Link to="/import/account">Account import</Link></li>
          <li><Link to="/import/match">Match import</Link></li>
          <li className="account"><Link to="/useraccount">Account</Link></li>
          {/* <li><Link to="matchoverview">Match Overview</Link></li> */}
          {/* <li><Link to="assignref">Assign Referee</Link></li> */}
      </ul>
      </>
  )
}

export default Header;