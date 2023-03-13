// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="navigation-parent">
            <div className='logo'>
                <div className='logo-container'>
                    <div className='logo-image'>PartyBnb</div>
                </div>
            </div>
            <div className='search'>
                <span className='before-anywhere'></span>
                <button className='anywhere' type="button">
                    <div className='anywhere-text'>Anywhere</div>
                </button>
                <span className='before-anyweek'></span>
                <button className='anyweek' type="button">
                    <div className='anyweek-text'>Any Week</div>
                </button>
                <span className='before-searchbar'></span>
                <button className='searchbar' type="button">
                    <span className='before-guests'></span>
                    <div className='add-guests'>Add guests</div>
                    <div className='search-icon'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </button>

            </div>
            <div className='user-utils'>
                <div className="home">
                    <NavLink exact to="/">Home</NavLink>
                </div>
                {isLoaded && (
                    <div className="profile-button">
                        <ProfileButton user={sessionUser} />
                    </div>
                )}
            </div>
            {/* <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                {isLoaded && (
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </ul> */}
        </div>
    );
}

export default Navigation;