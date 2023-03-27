import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
const Header = () => {
    return (
        <div className='cus_header'>
            <li>
                <Link to="/">Modules</Link>  
            </li>
            <li>
                <Link to="/update">Updates</Link> 
            </li>
            <li>
                <Link to="/console">Terminal</Link>
            </li>
        </div>
    );
}

export default Header;
