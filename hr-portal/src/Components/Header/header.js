import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="App-header">
            <Link to="/signup" className="logo">
                HR Portal
            </Link>
            <nav className="nav-links">
                <Link to="/signup">SignUp</Link>
                <Link to="/login">Login</Link>
            </nav>
        </header>
    );
}

export default Header;
