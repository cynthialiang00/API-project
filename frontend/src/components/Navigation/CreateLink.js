import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CreateLink ({user}) {
    if (!user) return null;
    return (
    <span>
            <NavLink className="nav-create-spot" to="/spots/new">Create a New Spot</NavLink>
    </span>
    )
}

export default CreateLink;