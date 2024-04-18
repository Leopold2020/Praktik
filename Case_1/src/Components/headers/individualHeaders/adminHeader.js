import { useState } from 'react';
import { Link } from "react-router-dom";    
import './header.css'

function Header () {
  const [active, setActive] = useState("home");

  function handleClick(value) {
    setActive(value);
  };

  return(
      <>
      <ul className="links">
          {
            active === "home" ? 
              <li className='active'><Link>Home</Link></li>
            :
              <li onClick={()=>handleClick("home")}><Link to="">Home</Link></li>
          }
          <li onClick={()=>handleClick("login")}><Link to="/login">Login</Link></li>
          <li onClick={()=>handleClick("create")}><Link to="/create">Create</Link></li>
          <li onClick={()=>handleClick("overview")}><Link to="/overview">Overview</Link></li>
          <li onClick={()=>handleClick("import account")}><Link to="/import/account">Account import</Link></li>
          <li onClick={()=>handleClick("import match")}><Link to="/import/match">Match import</Link></li>
          <li className="account" onClick={()=>handleClick("user account")}><Link to="/useraccount">Account</Link></li>
          {/* <li><Link to="matchoverview">Match Overview</Link></li> */}
          {/* <li><Link to="assignref">Assign Referee</Link></li> */}
      </ul>
      </>
  )
}

export default Header;