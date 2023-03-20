// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateLink from './CreateLink';
import springbnblogo from '../../images/springbnblogo.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className="navigation-parent">
            <li className='logo'>
                    <NavLink className='logo-image' exact to="/">
                        <img src={springbnblogo} alt="Sprinbnb logo"></img>
                    </NavLink>
            </li>
            <li className='user-utils'>
                <CreateLink user={sessionUser}/>
                {/* <div className="home">
                    <NavLink exact to="/">Home</NavLink>
                </div> */}
                {isLoaded && (
                    <div className="profile-button">
                        <ProfileButton user={sessionUser} />
                    </div>
                )}
            </li>
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
        </ul>
    );
}

export default Navigation;