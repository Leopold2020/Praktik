import { Link } from "react-router-dom";    
import './header.css'

function Header () {
    return(
        <>
        <ul className="links">
            <li><Link to="">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
          
        </ul>
        </>
    )
}

export default Header;