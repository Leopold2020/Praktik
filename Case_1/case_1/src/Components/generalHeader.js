import { Link } from "react-router-dom";    
import './Header.css'

function Header () {
    return(
        <>
        <ul className="links">
            <li><Link to="home">Home</Link></li>
            <li><Link to="">Login</Link></li>
          
        </ul>
        </>
    )
}

export default Header;