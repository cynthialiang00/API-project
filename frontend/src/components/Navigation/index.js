// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateLink from './CreateLink';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="navigation-parent">
            <div className='logo'>
                <div className='logo-container'>
                    <div className='logo-image'>Springbnb</div>
                </div>
            </div>
            <div className='user-utils'>
                <div className="create-spot">
                    <CreateLink user={sessionUser}/>
                </div>
                {/* <div className="home">
                    <NavLink exact to="/">Home</NavLink>
                </div> */}
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