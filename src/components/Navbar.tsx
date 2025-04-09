import {Link} from "react-router";

import './Navbar.css';

const Navbar = () => {
    return (
        <header className="header">
            <nav>
                <ul>
                    <Link to="/" className="li">Home</Link>
                    <Link to="/favorite" className="li">Favorite</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;